import path from 'path';
import { env } from 'process';

import { AppEnv } from '../../../domain/model/AppEnv';
import { DotEnvLoader } from './DotEnvLoader';

export class AppEnvDotEnvLoader extends DotEnvLoader<AppEnv> {
  constructor() {
    super(AppEnvDotEnvLoader.getTestEnvPath());
  }

  private static getTestEnvPath(): string {
    return path.resolve(__dirname, '..', '..', '..', 'config', '.env');
  }

  protected parseIndex(): AppEnv {
    return {
      OMDB_API_KEY: env['OMDB_API_KEY'] as string,
    };
  }
}
