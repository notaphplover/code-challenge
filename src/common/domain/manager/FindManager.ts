import { Injectable } from '@nestjs/common';

import { FindAdapter } from '../adapter/FindAdapter';
import { ManagerAsync } from './ManagerAsync';

@Injectable()
export class FindManager<TModel, TQuery>
  implements ManagerAsync<TQuery, TModel[]>
{
  constructor(private readonly findAdapter: FindAdapter<TModel, TQuery>) {}

  public async manage(query: TQuery): Promise<TModel[]> {
    const models: TModel[] = await this.findAdapter.find(query);

    return models;
  }
}
