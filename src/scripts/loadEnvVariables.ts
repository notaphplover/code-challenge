import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppEnv } from '../appEnv/domain/model/AppEnv';
import { AppEnvDotEnvLoader } from '../appEnv/integration/dotenv/adapter/AppEnvDotEnvLoader';
import { AppEnvModule } from '../appEnv/integration/nest/module/AppEnvModule';
import { EnvLoader } from '../env/domain/adapter/EnvLoader';

export async function loadEnvVariables(): Promise<void> {
  const nestApplication: INestApplicationContext =
    await NestFactory.createApplicationContext(AppEnvModule);

  const appEnvLoader: EnvLoader<AppEnv> =
    nestApplication.get(AppEnvDotEnvLoader);

  appEnvLoader.load();
}
