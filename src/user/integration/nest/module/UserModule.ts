import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FindOneUserManager } from '../../../domain/manager/FindOneUserManager';
import { FindUserTypeOrmAdapter } from '../../typeOrm/adapter/FindUserTypeOrmAdapter';
import { UserFindQueryToUserFindQueryTypeOrmConverter } from '../../typeOrm/converter/UserFindQueryToUserFindQueryTypeOrmConverter';
import { UserTypeOrmToUserConverter } from '../../typeOrm/converter/UserTypeOrmToUserConverter';
import { UserTypeOrm } from '../../typeOrm/model/UserTypeOrm';

@Module({
  exports: [FindOneUserManager],
  imports: [TypeOrmModule.forFeature([UserTypeOrm])],
  providers: [
    FindOneUserManager,
    FindUserTypeOrmAdapter,
    UserFindQueryToUserFindQueryTypeOrmConverter,
    UserTypeOrmToUserConverter,
  ],
})
export class UserModule {}
