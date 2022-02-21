import { Inject } from '@nestjs/common';

import { InsertAdapter } from '../../../common/domain/adapter/InsertAdapter';
import { InsertOneManager } from '../../../common/domain/manager/InsertOneManager';
import { InsertExerciseTypeOrmAdapter } from '../../integration/typeOrm/adapter/InsertExerciseTypeOrmAdapter';
import { Exercise } from '../model/Exercise';
import { ExerciseInsertQuery } from '../query/ExerciseInsertQuery';

export class InsertExerciseManager extends InsertOneManager<
  Exercise,
  ExerciseInsertQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(InsertExerciseTypeOrmAdapter)
    insertExerciseAdapter: InsertAdapter<Exercise, ExerciseInsertQuery>,
  ) {
    super(insertExerciseAdapter);
  }
}
