import { UserTypeOrmFixtures } from '../../../../../user/integration/typeOrm/fixtures/model/UserTypeOrmFixtures';
import { UserTypeOrm } from '../../../../../user/integration/typeOrm/model/UserTypeOrm';
import { ExerciseFixtures } from '../../../../domain/fixtures/model/ExerciseFixtures';
import { Exercise } from '../../../../domain/model/Exercise';
import { ExerciseTypeOrm } from '../../model/ExerciseTypeOrm';

export class ExerciseTypeOrmFixtures {
  public static get any(): ExerciseTypeOrm {
    const exerciseFixture: Exercise = ExerciseFixtures.any;
    const userTypeOrmFixture: UserTypeOrm = UserTypeOrmFixtures.any;

    const fixture: ExerciseTypeOrm = new ExerciseTypeOrm();

    fixture.content = exerciseFixture.content;
    fixture.createdAt = exerciseFixture.createdAt;
    fixture.id = exerciseFixture.id;
    fixture.user = userTypeOrmFixture;
    fixture.userId = userTypeOrmFixture.id;

    return fixture;
  }
}
