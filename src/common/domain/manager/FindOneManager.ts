import { Injectable } from '@nestjs/common';

import { FindAdapter } from '../adapter/FindAdapter';
import { ManagerAsync } from './ManagerAsync';

@Injectable()
export class FindOneManager<TModel, TQuery>
  implements ManagerAsync<TQuery, TModel | undefined>
{
  constructor(private readonly findAdapter: FindAdapter<TModel, TQuery>) {}

  public async manage(query: TQuery): Promise<TModel | undefined> {
    const modelOrUndefined: TModel | undefined = await this.findAdapter.findOne(
      query,
    );

    return modelOrUndefined;
  }
}
