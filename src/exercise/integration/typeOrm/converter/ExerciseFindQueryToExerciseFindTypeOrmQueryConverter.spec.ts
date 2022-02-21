import { SelectQueryBuilder } from 'typeorm';

import { ExerciseFindQueryFixtures } from '../../../domain/fixtures/query/ExerciseFindQueryFixtures';
import { ExerciseFindQuery } from '../../../domain/query/ExerciseFindQuery';
import { ExerciseTypeOrm } from '../model/ExerciseTypeOrm';
import { ExerciseFindQueryToExerciseFindTypeOrmQueryConverter } from './ExerciseFindQueryToExerciseFindTypeOrmQueryConverter';

describe(ExerciseFindQueryToExerciseFindTypeOrmQueryConverter.name, () => {
  let exerciseFindQueryToExerciseFindTypeOrmQueryConverter: ExerciseFindQueryToExerciseFindTypeOrmQueryConverter;

  beforeAll(() => {
    exerciseFindQueryToExerciseFindTypeOrmQueryConverter =
      new ExerciseFindQueryToExerciseFindTypeOrmQueryConverter();
  });

  describe('.convert()', () => {
    let selectQueryBuilderMock: jest.Mocked<
      SelectQueryBuilder<ExerciseTypeOrm>
    >;

    beforeAll(() => {
      selectQueryBuilderMock = {
        andWhere: jest.fn().mockReturnThis(),
        setParameter: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
      } as Partial<
        jest.Mocked<SelectQueryBuilder<ExerciseTypeOrm>>
      > as jest.Mocked<SelectQueryBuilder<ExerciseTypeOrm>>;
    });

    describe('having an ExerciseFindQuery with limit', () => {
      let exerciseFindQueryFixture: ExerciseFindQuery;

      beforeAll(() => {
        exerciseFindQueryFixture = ExerciseFindQueryFixtures.withLimit;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = exerciseFindQueryToExerciseFindTypeOrmQueryConverter.convert(
            exerciseFindQueryFixture,
            selectQueryBuilderMock,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call queryBuilder.take()', () => {
          expect(selectQueryBuilderMock.take).toHaveBeenCalledTimes(1);
          expect(selectQueryBuilderMock.take).toHaveBeenCalledWith(
            exerciseFindQueryFixture.limit,
          );
        });

        it('should return a SelectQueryBuilder', () => {
          expect(result).toBe(selectQueryBuilderMock);
        });
      });
    });

    describe('having an ExerciseFindQuery with userId', () => {
      let exerciseFindQueryFixture: ExerciseFindQuery;

      beforeAll(() => {
        exerciseFindQueryFixture = ExerciseFindQueryFixtures.withUserId;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = exerciseFindQueryToExerciseFindTypeOrmQueryConverter.convert(
            exerciseFindQueryFixture,
            selectQueryBuilderMock,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call queryBuilder.setParameter()', () => {
          expect(selectQueryBuilderMock.setParameter).toHaveBeenCalledTimes(1);
          expect(selectQueryBuilderMock.setParameter).toHaveBeenCalledWith(
            'userId',
            exerciseFindQueryFixture.userId,
          );
        });

        it('should call queryBuilder.andWhere()', () => {
          expect(selectQueryBuilderMock.andWhere).toHaveBeenCalledTimes(1);
          expect(selectQueryBuilderMock.andWhere).toHaveBeenCalledWith(
            expect.stringContaining(':userId'),
          );
        });

        it('should return a SelectQueryBuilder', () => {
          expect(result).toBe(selectQueryBuilderMock);
        });
      });
    });
  });
});
