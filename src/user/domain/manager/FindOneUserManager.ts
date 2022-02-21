import { Injectable, Inject } from '@nestjs/common';

import { FindAdapter } from '../../../common/domain/adapter/FindAdapter';
import { FindOneManager } from '../../../common/domain/manager/FindOneManager';
import { FindUserTypeOrmAdapter } from '../../integration/typeOrm/adapter/FindUserTypeOrmAdapter';
import { User } from '../model/User';
import { UserFindQuery } from '../query/UserFindQuery';

@Injectable()
export class FindOneUserManager extends FindOneManager<User, UserFindQuery> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(FindUserTypeOrmAdapter)
    findUserAdapter: FindAdapter<User, UserFindQuery>,
  ) {
    super(findUserAdapter);
  }
}
