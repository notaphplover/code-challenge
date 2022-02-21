import { UserFixtures } from '../../../domain/fixtures/model/UserFixtures';
import { UserTypeOrmFixtures } from '../fixtures/model/UserTypeOrmFixtures';
import { UserTypeOrmToUserConverter } from './UserTypeOrmToUserConverter';

describe(UserTypeOrmToUserConverter.name, () => {
  let userTypeOrmToUserConverter: UserTypeOrmToUserConverter;

  beforeAll(() => {
    userTypeOrmToUserConverter = new UserTypeOrmToUserConverter();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = userTypeOrmToUserConverter.convert(UserTypeOrmFixtures.any);
      });

      it('should return an User', () => {
        expect(result).toStrictEqual(UserFixtures.any);
      });
    });
  });
});
