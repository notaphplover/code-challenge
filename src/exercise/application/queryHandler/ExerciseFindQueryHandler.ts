import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { FindManyExercisesManager } from '../../domain/manager/FindManyExercisesManager';
import { Exercise } from '../../domain/model/Exercise';
import { ExerciseFindQuery as DomainExerciseFindQuery } from '../../domain/query/ExerciseFindQuery';
import { ExerciseFindQuery } from '../query/ExerciseFindQuery';

@QueryHandler(ExerciseFindQuery)
export class ExerciseFindQueryHandler
  implements IQueryHandler<ExerciseFindQuery, Exercise[]>
{
  constructor(
    @Inject(FindManyExercisesManager)
    private readonly findManyExercisesManager: ManagerAsync<
      DomainExerciseFindQuery,
      Exercise[]
    >,
  ) {}

  public async execute(
    _exerciseFindQuery: ExerciseFindQuery,
  ): Promise<Exercise[]> {
    const domainExerciseFindQuery: DomainExerciseFindQuery = {};

    const exercises: Exercise[] = await this.findManyExercisesManager.manage(
      domainExerciseFindQuery,
    );

    return exercises;
  }
}
