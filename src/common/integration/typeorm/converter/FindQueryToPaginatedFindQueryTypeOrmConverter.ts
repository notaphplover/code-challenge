import { SelectQueryBuilder } from 'typeorm';

import { Converter } from '../../../domain/converter/Converter';

export type FindQueryToPaginatedFindQueryTypeOrmConverter<TModelDb, TQuery> =
  Converter<TQuery, SelectQueryBuilder<TModelDb>, SelectQueryBuilder<TModelDb>>;
