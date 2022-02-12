import http from 'http';

import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { FastifyServerOptions } from 'fastify';
import fastifyHelmet from 'fastify-helmet';

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

  await nestApplication.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'"],
        scriptSrc: ["'self'", "https: 'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  });

  const serverPort: number = 3000;
  const serverHost: string = '0.0.0.0';

  await nestApplication.listen(serverPort, serverHost);
}

void startServer();