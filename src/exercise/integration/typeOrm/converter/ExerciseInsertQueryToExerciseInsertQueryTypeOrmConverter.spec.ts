jest.mock('uuid');

import { DeepPartial } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { ExerciseInsertQueryFixtures } from '../../../domain/fixtures/query/ExerciseInsertQueryFixtures';
import { ExerciseInsertQuery } from '../../../domain/query/ExerciseInsertQuery';
import { ExerciseTypeOrm } from '../model/ExerciseTypeOrm';
import { ExerciseInsertQueryToExerciseInsertQueryTypeOrmConverter } from './ExerciseInsertQueryToExerciseInsertQueryTypeOrmConverter';

describe(ExerciseInsertQueryToExerciseInsertQueryTypeOrmConverter.name, () => {
  let exerciseInsertQueryToExerciseInsertQueryTypeOrmConverter: ExerciseInsertQueryToExerciseInsertQueryTypeOrmConverter;

  beforeAll(() => {
    exerciseInsertQueryToExerciseInsertQueryTypeOrmConverter =
      new ExerciseInsertQueryToExerciseInsertQueryTypeOrmConverter();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let dateFixture: Date;
      let uuidV4Fixture: string;
      let exerciseInsertQuery: ExerciseInsertQuery;
      let result: unknown;

      beforeAll(() => {
        dateFixture = new Date('2021-01-01');
        uuidV4Fixture = 'uuid-fixture';

        jest.useFakeTimers('modern');

        jest.setSystemTime(dateFixture);

        (uuidV4 as jest.Mock<string>).mockReturnValueOnce(uuidV4Fixture);

        exerciseInsertQuery = ExerciseInsertQueryFixtures.any;
        result =
          exerciseInsertQueryToExerciseInsertQueryTypeOrmConverter.convert(
            exerciseInsertQuery,
          );
      });

      afterAll(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
      });

      it('should return a DeepPartial<ExerciseTypeOrm>', () => {
        const expected: DeepPartial<ExerciseTypeOrm> = {
          content: exerciseInsertQuery.content,
          createdAt: dateFixture,
          id: uuidV4Fixture,
          user: {
            id: exerciseInsertQuery.userId,
          },
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });
});
