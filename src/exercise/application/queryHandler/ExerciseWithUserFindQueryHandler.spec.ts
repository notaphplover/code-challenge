import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { UserFixtures } from '../../../user/domain/fixtures/model/UserFixtures';
import { User } from '../../../user/domain/model/User';
import { UserFindQuery } from '../../../user/domain/query/UserFindQuery';
import { ExerciseFixtures } from '../../domain/fixtures/model/ExerciseFixtures';
import { ExerciseWithUserFixtures } from '../../domain/fixtures/model/ExerciseWithUserFixtures';
import { Exercise } from '../../domain/model/Exercise';
import { ExerciseWithUser } from '../../domain/model/ExerciseWithUser';
import { ExerciseFindQuery as DomainExerciseFindQuery } from '../../domain/query/ExerciseFindQuery';
import { ExerciseWithUserFindQuery } from '../query/ExerciseWithUserFindQuery';
import { ExerciseWithUserFindQueryHandler } from './ExerciseWithUserFindQueryHandler';

describe(ExerciseWithUserFindQueryHandler.name, () => {
  let findManyExercisesManagerMock: jest.Mocked<
    ManagerAsync<DomainExerciseFindQuery, Exercise[]>
  >;
  let findManyUsersManagerMock: jest.Mocked<
    ManagerAsync<UserFindQuery, User[]>
  >;
  let exerciseFindQueryHandler: ExerciseWithUserFindQueryHandler;

  beforeAll(() => {
    findManyExercisesManagerMock = {
      manage: jest.fn(),
    };

    findManyUsersManagerMock = {
      manage: jest.fn(),
    };

    exerciseFindQueryHandler = new ExerciseWithUserFindQueryHandler(
      findManyExercisesManagerMock,
      findManyUsersManagerMock,
    );
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let exerciseFixture: Exercise;
      let exerciseWithUserFixture: ExerciseWithUser;
      let userFixture: User;
      let result: unknown;

      beforeAll(async () => {
        exerciseFixture = ExerciseFixtures.any;
        exerciseWithUserFixture = ExerciseWithUserFixtures.any;
        userFixture = UserFixtures.any;

        findManyExercisesManagerMock.manage.mockResolvedValueOnce([
          exerciseFixture,
        ]);

        findManyUsersManagerMock.manage.mockResolvedValueOnce([userFixture]);

        result = await exerciseFindQueryHandler.execute(
          new ExerciseWithUserFindQuery(),
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call findManyExercisesManager.manage()', () => {
        expect(findManyExercisesManagerMock.manage).toHaveBeenCalledTimes(1);
        expect(findManyExercisesManagerMock.manage).toHaveBeenCalledWith({});
      });

      it('should call findManyUsersManager.manage()', () => {
        const expected: UserFindQuery = {
          ids: [userFixture.id],
        };

        expect(findManyUsersManagerMock.manage).toHaveBeenCalledTimes(1);
        expect(findManyUsersManagerMock.manage).toHaveBeenCalledWith(expected);
      });

      it('should return Exercise[]', () => {
        expect(result).toStrictEqual([exerciseWithUserFixture]);
      });
    });
  });
});
