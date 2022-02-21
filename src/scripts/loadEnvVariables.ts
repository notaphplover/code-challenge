import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '../app/integration/nest/module/AppModule';
import { AppEnv } from '../appEnv/domain/model/AppEnv';
import { AppEnvDotEnvLoader } from '../appEnv/integration/dotenv/adapter/AppEnvDotEnvLoader';
import { EnvLoader } from '../env/domain/adapter/EnvLoader';

export async function loadEnvVariables(): Promise<void> {
  const nestApplication: INestApplicationContext =
    await NestFactory.createApplicationContext(AppModule);

  const appEnvLoader: EnvLoader<AppEnv> =
    nestApplication.get(AppEnvDotEnvLoader);

  appEnvLoader.load();
}
