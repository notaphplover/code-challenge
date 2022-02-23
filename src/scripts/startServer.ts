import http from 'http';

import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { FastifyServerOptions } from 'fastify';

import { AppModule } from '../app/integration/nest/module/AppModule';
import { AppConfig } from '../appEnv/domain/config/AppConfig';

async function startServer(): Promise<void> {
  const fastifyServerOptions: FastifyServerOptions<http.Server> = {
    logger: true,
  };
  const fastifyAdapter: FastifyAdapter = new FastifyAdapter(
    fastifyServerOptions,
  );

  const nestApplicationOptions: NestApplicationOptions = {
    cors: { origin: '*' },
  };
  const nestApplication: NestFastifyApplication =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      fastifyAdapter,
      nestApplicationOptions,
    );

  nestApplication.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  nestApplication.setGlobalPrefix('api');

  const appConfig: AppConfig = nestApplication.get(AppConfig);

  await nestApplication.listen(appConfig.port, appConfig.host);
}

void startServer();
