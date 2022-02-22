import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { FindManyUsersManager } from '../../../user/domain/manager/FindManyUsersManager';
import { User } from '../../../user/domain/model/User';
import { UserFindQuery } from '../../../user/domain/query/UserFindQuery';
import { FindManyExercisesManager } from '../../domain/manager/FindManyExercisesManager';
import { Exercise } from '../../domain/model/Exercise';
import { ExerciseWithUser } from '../../domain/model/ExerciseWithUser';
import { ExerciseFindQuery as DomainExerciseFindQuery } from '../../domain/query/ExerciseFindQuery';
import { ExerciseWithUserFindQuery } from '../query/ExerciseWithUserFindQuery';

@QueryHandler(ExerciseWithUserFindQuery)
export class ExerciseWithUserFindQueryHandler
  implements IQueryHandler<ExerciseWithUserFindQuery, ExerciseWithUser[]>
{
  constructor(
    @Inject(FindManyExercisesManager)
    private readonly findManyExercisesManager: ManagerAsync<
      DomainExerciseFindQuery,
      Exercise[]
    >,
    @Inject(FindManyUsersManager)
    private readonly findManyUsersManager: ManagerAsync<UserFindQuery, User[]>,
  ) {}

  public async execute(
    _exerciseFindQuery: ExerciseWithUserFindQuery,
  ): Promise<ExerciseWithUser[]> {
    const domainExerciseFindQuery: DomainExerciseFindQuery = {};

    const exercises: Exercise[] = await this.findManyExercisesManager.manage(
      domainExerciseFindQuery,
    );

    const userIds: string[] = [
      ...new Set([...exercises.map((exercise: Exercise) => exercise.userId)]),
    ];

    const userFindQuery: UserFindQuery = {
      ids: userIds,
    };

    const users: User[] = await this.findManyUsersManager.manage(userFindQuery);

    const exercisesWithUser: ExerciseWithUser[] =
      this.composeExerciseWithUserArray(exercises, users);

    return exercisesWithUser;
  }

  private composeExerciseWithUserArray(
    exercises: Exercise[],
    users: User[],
  ): ExerciseWithUser[] {
    const userIdToUserMap: Map<string, User> = new Map(
      users.map((user: User) => [user.id, user]),
    );

    const exercisesWithUser: ExerciseWithUser[] = exercises.map(
      (exercise: Exercise) => ({
        content: exercise.content,
        createdAt: exercise.createdAt,
        id: exercise.id,
        user: userIdToUserMap.get(exercise.userId) as User,
      }),
    );

    return exercisesWithUser;
  }
}
