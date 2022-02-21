import { UserTypeOrmFixtures } from '../../../../user/integration/typeOrm/fixtures/model/UserTypeOrmFixtures';
import { UserTypeOrm } from '../../../../user/integration/typeOrm/model/UserTypeOrm';
import { ExerciseFindQuery } from '../../query/ExerciseFindQuery';

export class ExerciseFindQueryFixtures {
  public static get any(): ExerciseFindQuery {
    const fixture: ExerciseFindQuery = {};

    return fixture;
  }

  public static get withLimit(): ExerciseFindQuery {
    const fixture: ExerciseFindQuery = {
      ...ExerciseFindQueryFixtures.any,
      limit: 100,
    };

    return fixture;
  }

  public static get withUserId(): ExerciseFindQuery {
    const userTypeOrmFixture: UserTypeOrm = UserTypeOrmFixtures.any;

    const fixture: ExerciseFindQuery = {
      ...ExerciseFindQueryFixtures.any,
      userId: userTypeOrmFixture.id,
    };

    return fixture;
  }
}
