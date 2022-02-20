import http from 'http';

import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { FastifyServerOptions } from 'fastify';

import { AppConfig } from '../app/domain/config/AppConfig';
import { AppModule } from '../app/integration/nest/module/AppModule';

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

  nestApplication.setGlobalPrefix('api');

  const appConfig: AppConfig = nestApplication.get(AppConfig);

  await nestApplication.listen(appConfig.port, appConfig.host);
}

void startServer();
