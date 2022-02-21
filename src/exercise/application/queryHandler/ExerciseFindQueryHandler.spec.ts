import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { ExerciseFixtures } from '../../domain/fixtures/model/ExerciseFixtures';
import { Exercise } from '../../domain/model/Exercise';
import { ExerciseFindQuery as DomainExerciseFindQuery } from '../../domain/query/ExerciseFindQuery';
import { ExerciseFindQuery } from '../query/ExerciseFindQuery';
import { ExerciseFindQueryHandler } from './ExerciseFindQueryHandler';

describe(ExerciseFindQueryHandler.name, () => {
  let findManyExercisesManagerMock: jest.Mocked<
    ManagerAsync<DomainExerciseFindQuery, Exercise[]>
  >;
  let exerciseFindQueryHandler: ExerciseFindQueryHandler;

  beforeAll(() => {
    findManyExercisesManagerMock = {
      manage: jest.fn(),
    };

    exerciseFindQueryHandler = new ExerciseFindQueryHandler(
      findManyExercisesManagerMock,
    );
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let exerciseFixture: Exercise;
      let result: unknown;

      beforeAll(async () => {
        exerciseFixture = ExerciseFixtures.any;

        findManyExercisesManagerMock.manage.mockResolvedValueOnce([
          exerciseFixture,
        ]);

        result = await exerciseFindQueryHandler.execute(
          new ExerciseFindQuery(),
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call findManyExercisesManager.manage()', () => {
        expect(findManyExercisesManagerMock.manage).toHaveBeenCalledTimes(1);
        expect(findManyExercisesManagerMock.manage).toHaveBeenCalledWith({});
      });

      it('should return Exercise[]', () => {
        expect(result).toStrictEqual([exerciseFixture]);
      });
    });
  });
});
