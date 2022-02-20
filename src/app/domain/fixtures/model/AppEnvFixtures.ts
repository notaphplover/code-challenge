import { AppEnv } from '../../model/AppEnv';

export class AppEnvFixtures {
  public static get any(): AppEnv {
    const fixture: AppEnv = {
      HTTP_SERVER_HOST: 'host',
      HTTP_SERVER_PORT: 3000,
    };

    return fixture;
  }
}
