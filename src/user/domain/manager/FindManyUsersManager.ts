import { Injectable, Inject } from '@nestjs/common';

import { FindAdapter } from '../../../common/domain/adapter/FindAdapter';
import { FindManager } from '../../../common/domain/manager/FindManager';
import { FindUserTypeOrmAdapter } from '../../integration/typeOrm/adapter/FindUserTypeOrmAdapter';
import { User } from '../model/User';
import { UserFindQuery } from '../query/UserFindQuery';

@Injectable()
export class FindManyUsersManager extends FindManager<User, UserFindQuery> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(FindUserTypeOrmAdapter)
    findUserAdapter: FindAdapter<User, UserFindQuery>,
  ) {
    super(findUserAdapter);
  }
}
