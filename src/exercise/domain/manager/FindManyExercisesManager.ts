import { Inject, Injectable } from '@nestjs/common';

import { FindAdapter } from '../../../common/domain/adapter/FindAdapter';
import { FindManager } from '../../../common/domain/manager/FindManager';
import { FindExerciseTypeOrmAdapter } from '../../integration/typeOrm/adapter/FindExerciseTypeOrmAdapter';
import { Exercise } from '../model/Exercise';
import { ExerciseFindQuery } from '../query/ExerciseFindQuery';

@Injectable()
export class FindManyExercisesManager extends FindManager<
  Exercise,
  ExerciseFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(FindExerciseTypeOrmAdapter)
    findExerciseAdapter: FindAdapter<Exercise, ExerciseFindQuery>,
  ) {
    super(findExerciseAdapter);
  }
}
