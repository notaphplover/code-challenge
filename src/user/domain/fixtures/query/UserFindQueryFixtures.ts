import { UserFindQuery } from '../../query/UserFindQuery';

export class UserFindQueryFixtures {
  public static get any(): UserFindQuery {
    const userFindQuery: UserFindQuery = {};

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
