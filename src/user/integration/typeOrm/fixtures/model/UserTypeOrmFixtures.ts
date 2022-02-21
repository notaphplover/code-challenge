import { UserFixtures } from '../../../../domain/fixtures/model/UserFixtures';
import { User } from '../../../../domain/model/User';
import { UserTypeOrm } from '../../model/UserTypeOrm';

export class UserTypeOrmFixtures {
  public static get any(): UserTypeOrm {
    const userFixture: User = UserFixtures.any;

    const fixture: UserTypeOrm = new UserTypeOrm();

    fixture.id = userFixture.id;
    fixture.name = userFixture.name;

    return fixture;
  }
}
