import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FindManyUsersManager } from '../../../domain/manager/FindManyUsersManager';
import { FindOneUserManager } from '../../../domain/manager/FindOneUserManager';
import { FindUserTypeOrmAdapter } from '../../typeOrm/adapter/FindUserTypeOrmAdapter';
import { UserFindQueryToUserFindQueryTypeOrmConverter } from '../../typeOrm/converter/UserFindQueryToUserFindQueryTypeOrmConverter';
import { UserTypeOrmToUserConverter } from '../../typeOrm/converter/UserTypeOrmToUserConverter';
import { UserTypeOrm } from '../../typeOrm/model/UserTypeOrm';

@Module({
  exports: [FindOneUserManager, FindManyUsersManager],
  imports: [TypeOrmModule.forFeature([UserTypeOrm])],
  providers: [
    FindOneUserManager,
    FindManyUsersManager,
    FindUserTypeOrmAdapter,
    UserFindQueryToUserFindQueryTypeOrmConverter,
    UserTypeOrmToUserConverter,
  ],
})
export class UserModule {}
