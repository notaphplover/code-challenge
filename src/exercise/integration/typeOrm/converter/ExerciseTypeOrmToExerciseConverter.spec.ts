import { ExerciseFixtures } from '../../../domain/fixtures/model/ExerciseFixtures';
import { ExerciseTypeOrmFixtures } from '../fixtures/model/ExerciseTypeOrmFixtures';
import { ExerciseTypeOrmToExerciseConverter } from './ExerciseTypeOrmToExerciseConverter';

describe(ExerciseTypeOrmToExerciseConverter.name, () => {
  let exerciseTypeOrmToExerciseConverter: ExerciseTypeOrmToExerciseConverter;

  beforeAll(() => {
    exerciseTypeOrmToExerciseConverter =
      new ExerciseTypeOrmToExerciseConverter();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = exerciseTypeOrmToExerciseConverter.convert(
          ExerciseTypeOrmFixtures.any,
        );
      });

      it('should return an Exercise', () => {
        expect(result).toStrictEqual(ExerciseFixtures.any);
      });
    });
  });
});
