import { UserFixtures } from '../../../../user/domain/fixtures/model/UserFixtures';
import { User } from '../../../../user/domain/model/User';
import { Exercise } from '../../model/Exercise';

export class ExerciseFixtures {
  public static get any(): Exercise {
    const userFixture: User = UserFixtures.any;

    const fixture: Exercise = {
      content: 'sample content',
      createdAt: new Date('2020-12-01'),
      id: 'f3d639f8-4f57-42df-991e-3234a6dc896e',
      userId: userFixture.id,
    };

    return fixture;
  }
}
