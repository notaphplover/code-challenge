import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppEnv } from '../../../../appEnv/domain/model/AppEnv';
import { AppEnvDotEnvLoader } from '../../../../appEnv/integration/dotenv/adapter/AppEnvDotEnvLoader';
import { AppEnvModule } from '../../../../appEnv/integration/nest/module/AppEnvModule';
import { EnvLoader } from '../../../../env/domain/adapter/EnvLoader';
import { UserModule } from '../../../../user/integration/nest/module/UserModule';
import { UserTypeOrm } from '../../../../user/integration/typeOrm/model/UserTypeOrm';
import { AppController } from '../controller/AppController';

function typeOrmFactory(appEnvLoader: EnvLoader<AppEnv>): TypeOrmModuleOptions {
  appEnvLoader.load();

  return {
    entities: [UserTypeOrm],
  };
}

@Module({
  controllers: [AppController],
  imports: [
    AppEnvModule,
    TypeOrmModule.forRootAsync({
      imports: [AppEnvModule],
      inject: [AppEnvDotEnvLoader],
      useFactory: typeOrmFactory,
    }),
    UserModule,
  ],
})
export class AppModule {}
