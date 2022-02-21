import { Injectable } from '@nestjs/common';

import { InsertAdapter } from '../adapter/InsertAdapter';
import { ManagerAsync } from './ManagerAsync';

@Injectable()
export class InsertOneManager<TModel, TQuery>
  implements ManagerAsync<TQuery, TModel>
{
  constructor(private readonly insertAdapter: InsertAdapter<TModel, TQuery>) {}

  public async manage(query: TQuery): Promise<TModel> {
    return this.insertAdapter.insertOne(query);
  }
}
