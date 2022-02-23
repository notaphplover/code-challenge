import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppEnv } from '../../../../appEnv/domain/model/AppEnv';
import { AppEnvDotEnvLoader } from '../../../../appEnv/integration/dotenv/adapter/AppEnvDotEnvLoader';
import { AppEnvModule } from '../../../../appEnv/integration/nest/module/AppEnvModule';
import { EnvLoader } from '../../../../env/domain/adapter/EnvLoader';
import { ExerciseModule } from '../../../../exercise/integration/nest/module/ExerciseModule';
import { ExerciseTypeOrm } from '../../../../exercise/integration/typeOrm/model/ExerciseTypeOrm';
import { UserModule } from '../../../../user/integration/nest/module/UserModule';
import { UserTypeOrm } from '../../../../user/integration/typeOrm/model/UserTypeOrm';
import { AppController } from '../controller/AppController';

function typeOrmFactory(appEnvLoader: EnvLoader<AppEnv>): TypeOrmModuleOptions {
  appEnvLoader.load();

  return {
    entities: [ExerciseTypeOrm, UserTypeOrm],
  };
}

@Module({
  controllers: [AppController],
  imports: [
    AppEnvModule,
    ExerciseModule,
    RouterModule.register([
      {
        module: ExerciseModule,
        path: 'exercises',
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [AppEnvModule],
      inject: [AppEnvDotEnvLoader],
      useFactory: typeOrmFactory,
    }),
    UserModule,
  ],
})
export class AppModule {}
