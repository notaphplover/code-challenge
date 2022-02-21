import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Converter } from '../../../../common/domain/converter/Converter';
import { FindTypeOrmAdapter } from '../../../../common/integration/typeorm/adapter/FindTypeOrmAdapter';
import { FindQueryToFindQueryTypeOrmConverter } from '../../../../common/integration/typeorm/converter/FindQueryToFindQueryTypeOrmConverter';
import { User } from '../../../domain/model/User';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserFindQueryToUserFindQueryTypeOrmConverter } from '../converter/UserFindQueryToUserFindQueryTypeOrmConverter';
import { UserTypeOrmToUserConverter } from '../converter/UserTypeOrmToUserConverter';
import { UserTypeOrm } from '../model/UserTypeOrm';

@Injectable()
export class FindUserTypeOrmAdapter extends FindTypeOrmAdapter<
  User,
  UserTypeOrm,
  UserFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @InjectRepository(UserTypeOrm)
    userRepository: Repository<UserTypeOrm>,
    @Inject(UserTypeOrmToUserConverter)
    userTypeOrmToUserConverter: Converter<UserTypeOrm, User>,
    @Inject(UserFindQueryToUserFindQueryTypeOrmConverter)
    findQueryToFindQueryTypeOrmConverter: FindQueryToFindQueryTypeOrmConverter<
      UserTypeOrm,
      UserFindQuery
    >,
  ) {
    super(
      userRepository,
      userTypeOrmToUserConverter,
      findQueryToFindQueryTypeOrmConverter,
    );
  }
}
