import { InsertAdapter } from '../adapter/InsertAdapter';
import { InsertOneManager } from './InsertOneManager';

interface ModelTest {
  foo: unknown;
}

interface QueryTest {
  bar: unknown;
}

describe(InsertOneManager.name, () => {
  let insertAdapterMock: jest.Mocked<InsertAdapter<ModelTest, QueryTest>>;
  let insertOneManager: InsertOneManager<ModelTest, QueryTest>;

  beforeAll(() => {
    insertAdapterMock = {
      insertOne: jest.fn(),
    } as Partial<
      jest.Mocked<InsertAdapter<ModelTest, QueryTest>>
    > as jest.Mocked<InsertAdapter<ModelTest, QueryTest>>;

    insertOneManager = new InsertOneManager(insertAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let modelFixture: ModelTest;
      let queryFixture: QueryTest;
      let result: unknown;

      beforeAll(async () => {
        modelFixture = {
          foo: 'sample',
        };

        queryFixture = {
          bar: 'sample-string',
        };

        insertAdapterMock.insertOne.mockResolvedValueOnce(modelFixture);
        result = await insertOneManager.manage(queryFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call insertAdapter.insertOne()', () => {
        expect(insertAdapterMock.insertOne).toHaveBeenCalledTimes(1);
        expect(insertAdapterMock.insertOne).toHaveBeenCalledWith(queryFixture);
      });

      it('should return a IModelTest', () => {
        expect(result).toBe(modelFixture);
      });
    });
  });
});
