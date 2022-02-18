import { DeepPartial, Repository } from 'typeorm';

import { Converter } from '../../../domain/converter/Converter';
import { InsertTypeOrmAdapter } from './InsertTypeOrmAdapter';

interface ModelTest {
  foo: unknown;
}

interface QueryTest {
  bar: unknown;
}

describe(InsertTypeOrmAdapter.name, () => {
  let repositoryMock: jest.Mocked<Repository<ModelTest>>;
  let modelDbToModelConverterMock: jest.Mocked<Converter<ModelTest, ModelTest>>;
  let queryToTypeOrmQueryConverterMock: jest.Mocked<
    Converter<QueryTest, DeepPartial<ModelTest>>
  >;

  let insertTypeOrmAdapter: InsertTypeOrmAdapter<
    ModelTest,
    ModelTest,
    QueryTest
  >;

  beforeAll(() => {
    repositoryMock = {
      save: jest.fn(),
    } as Partial<jest.Mocked<Repository<ModelTest>>> as jest.Mocked<
      Repository<ModelTest>
    >;

    modelDbToModelConverterMock = {
      convert: jest.fn(),
    };
    queryToTypeOrmQueryConverterMock = {
      convert: jest.fn(),
    };

    insertTypeOrmAdapter = new InsertTypeOrmAdapter(
      repositoryMock,
      modelDbToModelConverterMock,
      queryToTypeOrmQueryConverterMock,
    );
  });

  describe('.insertOne()', () => {
    describe('when called', () => {
      let modelFixture: ModelTest;
      let queryFixture: QueryTest;
      let typeOrmQueryFixture: DeepPartial<ModelTest>;

      let result: unknown;

      beforeAll(async () => {
        modelFixture = {
          foo: 'sample-string',
        };

        queryFixture = {
          bar: 'sample',
        };

        typeOrmQueryFixture = {};

        repositoryMock.save.mockResolvedValueOnce(modelFixture);
        modelDbToModelConverterMock.convert.mockReturnValueOnce(modelFixture);
        queryToTypeOrmQueryConverterMock.convert.mockReturnValueOnce(
          typeOrmQueryFixture,
        );

        result = await insertTypeOrmAdapter.insertOne(queryFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryToTypeOrmQueryConverterMock.convert()', () => {
        expect(queryToTypeOrmQueryConverterMock.convert).toHaveBeenCalledTimes(
          1,
        );
        expect(queryToTypeOrmQueryConverterMock.convert).toHaveBeenCalledWith(
          queryFixture,
        );
      });

      it('should call repositoryMock.save()', () => {
        expect(repositoryMock.save).toHaveBeenCalledTimes(1);
        expect(repositoryMock.save).toHaveBeenCalledWith(typeOrmQueryFixture);
      });

      it('should call modelDbToModelConverter.convert()', () => {
        expect(modelDbToModelConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(modelDbToModelConverterMock.convert).toHaveBeenCalledWith(
          modelFixture,
        );
      });

      it('should return an ModelTest', () => {
        expect(result).toBe(modelFixture);
      });
    });
  });
});
