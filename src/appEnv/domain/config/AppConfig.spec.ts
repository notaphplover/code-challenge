import { EnvLoader } from '../../../env/domain/adapter/EnvLoader';
import { AppEnvFixtures } from '../fixtures/model/AppEnvFixtures';
import { AppEnv } from '../model/AppEnv';
import { AppConfig } from './AppConfig';

describe(AppConfig.name, () => {
  let appEnvLoader: jest.Mocked<EnvLoader<AppEnv>>;

  beforeAll(() => {
    appEnvLoader = {
      index: AppEnvFixtures.any,
    } as Partial<jest.Mocked<EnvLoader<AppEnv>>> as jest.Mocked<
      EnvLoader<AppEnv>
    >;
  });

  describe('when instantiated', () => {
    let appConfig: AppConfig;

    beforeAll(() => {
      appConfig = new AppConfig(appEnvLoader);
    });

    it('should have its properties set', () => {
      expect(appConfig.host).toBe(appEnvLoader.index.HTTP_SERVER_HOST);
      expect(appConfig.port).toBe(appEnvLoader.index.HTTP_SERVER_PORT);
    });
  });
});
