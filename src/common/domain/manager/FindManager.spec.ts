import { FindAdapter } from '../adapter/FindAdapter';
import { FindManager } from './FindManager';

interface ModelTest {
  foo: string;
}

interface QueryTest {
  fooValue: string;
}

describe(FindManager.name, () => {
  let findAdapterMock: jest.Mocked<FindAdapter<ModelTest, QueryTest>>;
  let findManager: FindManager<ModelTest, QueryTest>;

  beforeAll(() => {
    findAdapterMock = {
      find: jest.fn(),
    } as Partial<jest.Mocked<FindAdapter<ModelTest, QueryTest>>> as jest.Mocked<
      FindAdapter<ModelTest, QueryTest>
    >;

    findManager = new FindManager(findAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let modelsTestFixture: ModelTest[];
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          fooValue: 'bar',
        };

        modelsTestFixture = [
          {
            foo: 'bar',
          },
        ];

        findAdapterMock.find.mockResolvedValueOnce(modelsTestFixture);

        result = await findManager.manage(queryTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call findAdapter.find()', () => {
        expect(findAdapterMock.find).toHaveBeenCalledTimes(1);
        expect(findAdapterMock.find).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return TModel[]', () => {
        expect(result).toBe(modelsTestFixture);
      });
    });
  });
});
