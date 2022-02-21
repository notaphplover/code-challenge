import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { Converter } from '../../../../common/domain/converter/Converter';
import { InsertTypeOrmAdapter } from '../../../../common/integration/typeorm/adapter/InsertTypeOrmAdapter';
import { Exercise } from '../../../domain/model/Exercise';
import { ExerciseInsertQuery } from '../../../domain/query/ExerciseInsertQuery';
import { ExerciseInsertQueryToExerciseInsertQueryTypeOrmConverter } from '../converter/ExerciseInsertQueryToExerciseInsertQueryTypeOrmConverter';
import { ExerciseTypeOrmToExerciseConverter } from '../converter/ExerciseTypeOrmToExerciseConverter';
import { ExerciseTypeOrm } from '../model/ExerciseTypeOrm';

@Injectable()
export class InsertExerciseTypeOrmAdapter extends InsertTypeOrmAdapter<
  Exercise,
  ExerciseTypeOrm,
  ExerciseInsertQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @InjectRepository(ExerciseTypeOrm) repository: Repository<ExerciseTypeOrm>,
    @Inject(ExerciseTypeOrmToExerciseConverter)
    exerciseTypeOrmToExerciseConverter: Converter<ExerciseTypeOrm, Exercise>,
    @Inject(ExerciseInsertQueryToExerciseInsertQueryTypeOrmConverter)
    exerciseInsertQueryToExerciseInsertQueryTypeOrmConverter: Converter<
      ExerciseInsertQuery,
      DeepPartial<ExerciseTypeOrm>
    >,
  ) {
    super(
      repository,
      exerciseTypeOrmToExerciseConverter,
      exerciseInsertQueryToExerciseInsertQueryTypeOrmConverter,
    );
  }
}
