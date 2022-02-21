import { loadEnvVariables } from './loadEnvVariables';

async function typeOrmCli(): Promise<void> {
  await loadEnvVariables();

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('typeorm/cli');
}

void typeOrmCli();
