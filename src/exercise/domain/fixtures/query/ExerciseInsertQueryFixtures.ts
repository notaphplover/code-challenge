import { UserFixtures } from '../../../../user/domain/fixtures/model/UserFixtures';
import { User } from '../../../../user/domain/model/User';
import { ExerciseInsertQuery } from '../../query/ExerciseInsertQuery';

export class ExerciseInsertQueryFixtures {
  public static get any(): ExerciseInsertQuery {
    const userFixture: User = UserFixtures.any;

    const fixture: ExerciseInsertQuery = {
      content: 'sample content',
      userId: userFixture.id,
    };

    return fixture;
  }
}
