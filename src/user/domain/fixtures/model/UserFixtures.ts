import { User } from '../../model/User';

export class UserFixtures {
  public static get any(): User {
    const fixture: User = {
      id: 'a488c0d2-6e87-401a-88e1-3ddc59f290a2',
      name: 'Bob',
    };

    return fixture;
  }
}
