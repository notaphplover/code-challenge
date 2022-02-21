import { FindAdapter } from '../adapter/FindAdapter';
import { FindOneManager } from './FindOneManager';

interface ModelTest {
  foo: string;
}

interface QueryTest {
  fooValue: string;
}

describe(FindOneManager.name, () => {
  let findAdapterMock: jest.Mocked<FindAdapter<ModelTest, QueryTest>>;
  let findOneManager: FindOneManager<ModelTest, QueryTest>;

  beforeAll(() => {
    findAdapterMock = {
      findOne: jest.fn(),
    } as Partial<jest.Mocked<FindAdapter<ModelTest, QueryTest>>> as jest.Mocked<
      FindAdapter<ModelTest, QueryTest>
    >;

    findOneManager = new FindOneManager(findAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let modelTestFixture: ModelTest;
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          fooValue: 'bar',
        };

        modelTestFixture = {
          foo: 'bar',
        };

        findAdapterMock.findOne.mockResolvedValueOnce(modelTestFixture);

        result = await findOneManager.manage(queryTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call findAdapter.findOne()', () => {
        expect(findAdapterMock.findOne).toHaveBeenCalledTimes(1);
        expect(findAdapterMock.findOne).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return TModel or undefined', () => {
        expect(result).toBe(modelTestFixture);
      });
    });
  });
});
