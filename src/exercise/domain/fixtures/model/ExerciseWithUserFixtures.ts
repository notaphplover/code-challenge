import { UserFixtures } from '../../../../user/domain/fixtures/model/UserFixtures';
import { User } from '../../../../user/domain/model/User';
import { Exercise } from '../../model/Exercise';
import { ExerciseWithUser } from '../../model/ExerciseWithUser';
import { ExerciseFixtures } from './ExerciseFixtures';

export class ExerciseWithUserFixtures {
  public static get any(): ExerciseWithUser {
    const exerciseFixture: Exercise = ExerciseFixtures.any;
    const userFixture: User = UserFixtures.any;

    const fixture: ExerciseWithUser = {
      content: exerciseFixture.content,
      createdAt: exerciseFixture.createdAt,
      id: exerciseFixture.id,
      user: userFixture,
    };

    return fixture;
  }
}
