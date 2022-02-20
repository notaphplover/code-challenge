import path from 'path';
import { env } from 'process';

import { Injectable } from '@nestjs/common';

import { DotEnvLoader } from '../../../../env/integration/dotenv/adapter/DotEnvLoader';
import { AppEnv } from '../../../domain/model/AppEnv';

@Injectable()
export class AppEnvDotEnvLoader extends DotEnvLoader<AppEnv> {
  constructor() {
    super(AppEnvDotEnvLoader.getTestEnvPath());
  }

  private static getTestEnvPath(): string {
    return path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      'config',
      '.env',
    );
  }

  protected parseIndex(): AppEnv {
    return {
      HTTP_SERVER_HOST: env['HTTP_SERVER_HOST'] as string,
      HTTP_SERVER_PORT: parseInt(env['HTTP_SERVER_PORT'] as string),
    };
  }
}
