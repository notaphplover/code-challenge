import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Converter } from '../../../../common/domain/converter/Converter';
import { FindTypeOrmAdapter } from '../../../../common/integration/typeorm/adapter/FindTypeOrmAdapter';
import { FindQueryToPaginatedFindQueryTypeOrmConverter } from '../../../../common/integration/typeorm/converter/FindQueryToPaginatedFindQueryTypeOrmConverter';
import { Exercise } from '../../../domain/model/Exercise';
import { ExerciseFindQuery } from '../../../domain/query/ExerciseFindQuery';
import { ExerciseFindQueryToExerciseFindTypeOrmQueryConverter } from '../converter/ExerciseFindQueryToExerciseFindTypeOrmQueryConverter';
import { ExerciseTypeOrmToExerciseConverter } from '../converter/ExerciseTypeOrmToExerciseConverter';
import { ExerciseTypeOrm } from '../model/ExerciseTypeOrm';

@Injectable()
export class FindExerciseTypeOrmAdapter extends FindTypeOrmAdapter<
  Exercise,
  ExerciseTypeOrm,
  ExerciseFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @InjectRepository(ExerciseTypeOrm)
    exerciseRepository: Repository<ExerciseTypeOrm>,
    @Inject(ExerciseTypeOrmToExerciseConverter)
    exerciseTypeOrmToExerciseConverter: Converter<ExerciseTypeOrm, Exercise>,
    @Inject(ExerciseFindQueryToExerciseFindTypeOrmQueryConverter)
    findQueryToFindQueryTypeOrmConverter: FindQueryToPaginatedFindQueryTypeOrmConverter<
      ExerciseTypeOrm,
      ExerciseFindQuery
    >,
  ) {
    super(
      exerciseRepository,
      exerciseTypeOrmToExerciseConverter,
      findQueryToFindQueryTypeOrmConverter,
    );
  }
}
