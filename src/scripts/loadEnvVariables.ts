import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppEnv } from '../app/domain/model/AppEnv';
import { AppEnvDotEnvLoader } from '../app/integration/dotenv/adapter/AppEnvDotEnvLoader';
import { AppModule } from '../app/integration/nest/module/AppModule';
import { EnvLoader } from '../env/domain/adapter/EnvLoader';

export async function loadEnvVariables(): Promise<void> {
  const nestApplication: INestApplicationContext =
    await NestFactory.createApplicationContext(AppModule);

  const appEnvLoader: EnvLoader<AppEnv> =
    nestApplication.get(AppEnvDotEnvLoader);

  appEnvLoader.load();
}
