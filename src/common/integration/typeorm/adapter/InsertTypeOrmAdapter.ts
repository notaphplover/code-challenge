import { Injectable } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';

import { InsertAdapter } from '../../../domain/adapter/InsertAdapter';
import { Converter } from '../../../domain/converter/Converter';

@Injectable()
export class InsertTypeOrmAdapter<TModel, TModelDb, TQuery>
  implements InsertAdapter<TModel, TQuery>
{
  constructor(
    private readonly repository: Repository<TModelDb>,
    private readonly modelDbToModelConverter: Converter<TModelDb, TModel>,
    private readonly queryToTypeOrmQueryConverter: Converter<
      TQuery,
      DeepPartial<TModelDb>
    >,
  ) {}

  public async insertOne(query: TQuery): Promise<TModel> {
    const typeOrmQuery: DeepPartial<TModelDb> =
      this.queryToTypeOrmQueryConverter.convert(query);
    const modelDb: TModelDb = await this.repository.save(typeOrmQuery);
    const model: TModel = this.modelDbToModelConverter.convert(modelDb);

    return model;
  }
}
