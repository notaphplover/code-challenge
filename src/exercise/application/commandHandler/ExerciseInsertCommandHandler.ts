import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { FindManyExercisesManager } from '../../domain/manager/FindManyExercisesManager';
import { InsertExerciseManager } from '../../domain/manager/InsertExerciseManager';
import { Exercise } from '../../domain/model/Exercise';
import { ExerciseFindQuery } from '../../domain/query/ExerciseFindQuery';
import { ExerciseInsertQuery } from '../../domain/query/ExerciseInsertQuery';
import { ExerciseInsertCommand } from '../command/ExerciseInsertCommand';

@CommandHandler(ExerciseInsertCommand)
export class ExerciseInsertCommandHandler
  implements ICommandHandler<ExerciseInsertCommand, void>
{
  constructor(
    @Inject(FindManyExercisesManager)
    private readonly findExerciseManager: ManagerAsync<
      ExerciseFindQuery,
      Exercise[]
    >,
    @Inject(InsertExerciseManager)
    private readonly insertExerciseManager: ManagerAsync<
      ExerciseInsertQuery,
      Exercise
    >,
  ) {}

  public async execute(
    exerciseInsertCommand: ExerciseInsertCommand,
  ): Promise<void> {
    const maximunExercisesPerUser: number = 10;

    const exerciseFindQuery: ExerciseFindQuery = {
      limit: maximunExercisesPerUser,
      userId: exerciseInsertCommand.userId,
    };

    const userExercises: Exercise[] = await this.findExerciseManager.manage(
      exerciseFindQuery,
    );

    if (userExercises.length >= maximunExercisesPerUser) {
      throw new BadRequestException(
        'Maximun number of exercises exceeded for this user',
      );
    }

    const exerciseInsertQuery: ExerciseInsertQuery = {
      content: exerciseInsertCommand.content,
      userId: exerciseInsertCommand.userId,
    };

    await this.insertExerciseManager.manage(exerciseInsertQuery);
  }
}
