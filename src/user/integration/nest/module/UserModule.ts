import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FindUserTypeOrmAdapter } from '../../typeOrm/adapter/FindUserTypeOrmAdapter';
import { UserFindQueryToUserFindQueryTypeOrmConverter } from '../../typeOrm/converter/UserFindQueryToUserFindQueryTypeOrmConverter';
import { UserTypeOrmToUserConverter } from '../../typeOrm/converter/UserTypeOrmToUserConverter';
import { UserTypeOrm } from '../../typeOrm/model/UserTypeOrm';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrm])],
  providers: [
    FindUserTypeOrmAdapter,
    UserFindQueryToUserFindQueryTypeOrmConverter,
    UserTypeOrmToUserConverter,
  ],
})
export class UserModule {}
