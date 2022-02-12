import { Module } from '@nestjs/common';

import { AppController } from '../controller/AppController';

@Module({
  controllers: [AppController],
})
export class AppModule {}
