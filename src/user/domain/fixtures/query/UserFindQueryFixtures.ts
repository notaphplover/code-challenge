import { User } from '../../model/User';
import { UserFindQuery } from '../../query/UserFindQuery';
import { UserFixtures } from '../model/UserFixtures';

export class UserFindQueryFixtures {
  public static get any(): UserFindQuery {
    const userFindQuery: UserFindQuery = {};

    return userFindQuery;
  }

  public static get withIds(): UserFindQuery {
    const userFixture: User = UserFixtures.any;

    const userFindQuery: UserFindQuery = {
      ...UserFindQueryFixtures.any,
      ids: [userFixture.id],
    };

    return userFindQuery;
  }

  public static get withName(): UserFindQuery {
    const userFindQuery: UserFindQuery = {
      ...UserFindQueryFixtures.any,
      name: 'Bob',
    };

    return userFindQuery;
  }
}
