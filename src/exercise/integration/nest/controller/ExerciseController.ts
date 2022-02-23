import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ExerciseInsertCommand } from '../../../application/command/ExerciseInsertCommand';
import { ExerciseWithUserFindQuery } from '../../../application/query/ExerciseWithUserFindQuery';
import { ExerciseWithUser } from '../../../domain/model/ExerciseWithUser';
import { ExerciseInsertCommandNest } from '../command/ExerciseInsertCommandNest';

@Controller()
export class ExerciseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  public async getExercises(): Promise<ExerciseWithUser[]> {
    const exerciseFindQuery: ExerciseWithUserFindQuery =
      new ExerciseWithUserFindQuery();

    const exercisesWithUser: ExerciseWithUser[] = await this.queryBus.execute(
      exerciseFindQuery,
    );

    return exercisesWithUser;
  }

  @Post()
  public async insertExercise(
    @Body() exerciseInsertCommandNest: ExerciseInsertCommandNest,
  ): Promise<void> {
    const exerciseInsertCommand: ExerciseInsertCommand =
      new ExerciseInsertCommand(
        exerciseInsertCommandNest.content,
        exerciseInsertCommandNest.userId,
      );

    await this.commandBus.execute(exerciseInsertCommand);
  }
}
