import { Inject, Injectable } from '@nestjs/common';

import { EnvLoader } from '../../../env/domain/adapter/EnvLoader';
import { AppEnvDotEnvLoader } from '../../integration/dotenv/adapter/AppEnvDotEnvLoader';
import { AppEnv } from '../model/AppEnv';

@Injectable()
export class AppConfig {
  public readonly host: string;
  public readonly port: number;

  constructor(@Inject(AppEnvDotEnvLoader) appEnvLoader: EnvLoader<AppEnv>) {
    const envVariables: AppEnv = appEnvLoader.index;

    this.host = envVariables.HTTP_SERVER_HOST;
    this.port = envVariables.HTTP_SERVER_PORT;
  }
}
