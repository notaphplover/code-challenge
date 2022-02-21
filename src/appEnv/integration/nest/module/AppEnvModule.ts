import { Module } from '@nestjs/common';

import { AppConfig } from '../../../domain/config/AppConfig';
import { AppEnvDotEnvLoader } from '../../dotenv/adapter/AppEnvDotEnvLoader';

@Module({
  exports: [AppConfig, AppEnvDotEnvLoader],
  providers: [AppConfig, AppEnvDotEnvLoader],
})
export class AppEnvModule {}
