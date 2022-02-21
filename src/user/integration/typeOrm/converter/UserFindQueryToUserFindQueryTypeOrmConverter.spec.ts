import { QueryBuilder, WhereExpressionBuilder } from 'typeorm';

import { UserFindQueryFixtures } from '../../../domain/fixtures/query/UserFindQueryFixtures';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserTypeOrm } from '../model/UserTypeOrm';
import { UserFindQueryToUserFindQueryTypeOrmConverter } from './UserFindQueryToUserFindQueryTypeOrmConverter';

describe(UserFindQueryToUserFindQueryTypeOrmConverter.name, () => {
  let userFindQueryToUserFindQueryTypeOrmConverter: UserFindQueryToUserFindQueryTypeOrmConverter;

  beforeAll(() => {
    userFindQueryToUserFindQueryTypeOrmConverter =
      new UserFindQueryToUserFindQueryTypeOrmConverter();
  });

  describe('.convert()', () => {
    let queryBuilderMock: jest.Mocked<
      QueryBuilder<UserTypeOrm> & WhereExpressionBuilder
    >;

    beforeAll(() => {
      queryBuilderMock = {
        andWhere: jest.fn().mockReturnThis(),
        setParameter: jest.fn().mockReturnThis(),
      } as Partial<
        jest.Mocked<QueryBuilder<UserTypeOrm> & WhereExpressionBuilder>
      > as jest.Mocked<QueryBuilder<UserTypeOrm> & WhereExpressionBuilder>;
    });

    describe('having an UserFindQuery with ids', () => {
      let userFindQueryFixture: UserFindQuery;

      beforeAll(() => {
        userFindQueryFixture = UserFindQueryFixtures.withIds;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = userFindQueryToUserFindQueryTypeOrmConverter.convert(
            userFindQueryFixture,
            queryBuilderMock,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call queryBuilder.setParameter()', () => {
          expect(queryBuilderMock.setParameter).toHaveBeenCalledTimes(1);
          expect(queryBuilderMock.setParameter).toHaveBeenCalledWith(
            'ids',
            userFindQueryFixture.ids,
          );
        });

        it('should call queryBuilder.andWhere()', () => {
          expect(queryBuilderMock.andWhere).toHaveBeenCalledTimes(1);
          expect(queryBuilderMock.andWhere).toHaveBeenCalledWith(
            expect.stringContaining(':ids'),
          );
        });

        it('should return a QueryBuilder', () => {
          expect(result).toBe(queryBuilderMock);
        });
      });
    });

    describe('having an UserFindQuery with name', () => {
      let userFindQueryFixture: UserFindQuery;

      beforeAll(() => {
        userFindQueryFixture = UserFindQueryFixtures.withName;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = userFindQueryToUserFindQueryTypeOrmConverter.convert(
            userFindQueryFixture,
            queryBuilderMock,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call queryBuilder.setParameter()', () => {
          expect(queryBuilderMock.setParameter).toHaveBeenCalledTimes(1);
          expect(queryBuilderMock.setParameter).toHaveBeenCalledWith(
            'name',
            userFindQueryFixture.name,
          );
        });

        it('should call queryBuilder.andWhere()', () => {
          expect(queryBuilderMock.andWhere).toHaveBeenCalledTimes(1);
          expect(queryBuilderMock.andWhere).toHaveBeenCalledWith(
            expect.stringContaining(':name'),
          );
        });

        it('should return a QueryBuilder', () => {
          expect(result).toBe(queryBuilderMock);
        });
      });
    });
  });
});
