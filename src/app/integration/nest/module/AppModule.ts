import { Module } from '@nestjs/common';

import { AppConfig } from '../../../domain/config/AppConfig';
import { AppEnvDotEnvLoader } from '../../dotenv/adapter/AppEnvDotEnvLoader';
import { AppController } from '../controller/AppController';

@Module({
  controllers: [AppController],
  providers: [AppConfig, AppEnvDotEnvLoader],
})
export class AppModule {}
