import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../../../../user/integration/nest/module/UserModule';
import { ExerciseInsertCommandHandler } from '../../../application/commandHandler/ExerciseInsertCommandHandler';
import { ExerciseWithUserFindQueryHandler } from '../../../application/queryHandler/ExerciseWithUserFindQueryHandler';
import { FindManyExercisesManager } from '../../../domain/manager/FindManyExercisesManager';
import { InsertExerciseManager } from '../../../domain/manager/InsertExerciseManager';
import { FindExerciseTypeOrmAdapter } from '../../typeOrm/adapter/FindExerciseTypeOrmAdapter';
import { InsertExerciseTypeOrmAdapter } from '../../typeOrm/adapter/InsertExerciseTypeOrmAdapter';
import { ExerciseFindQueryToExerciseFindTypeOrmQueryConverter } from '../../typeOrm/converter/ExerciseFindQueryToExerciseFindTypeOrmQueryConverter';
import { ExerciseInsertQueryToExerciseInsertQueryTypeOrmConverter } from '../../typeOrm/converter/ExerciseInsertQueryToExerciseInsertQueryTypeOrmConverter';
import { ExerciseTypeOrmToExerciseConverter } from '../../typeOrm/converter/ExerciseTypeOrmToExerciseConverter';
import { ExerciseTypeOrm } from '../../typeOrm/model/ExerciseTypeOrm';
import { ExerciseController } from '../controller/ExerciseController';

@Module({
  controllers: [ExerciseController],
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ExerciseTypeOrm]),
    UserModule,
  ],
  providers: [
    FindExerciseTypeOrmAdapter,
    FindManyExercisesManager,
    ExerciseWithUserFindQueryHandler,
    ExerciseFindQueryToExerciseFindTypeOrmQueryConverter,
    ExerciseInsertCommandHandler,
    ExerciseInsertQueryToExerciseInsertQueryTypeOrmConverter,
    ExerciseTypeOrmToExerciseConverter,
    ExerciseInsertCommandHandler,
    InsertExerciseManager,
    InsertExerciseTypeOrmAdapter,
  ],
})
export class ExerciseModule {}
