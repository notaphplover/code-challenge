import { FindConditions, QueryBuilder, WhereExpressionBuilder } from 'typeorm';

import { Converter } from '../../../domain/converter/Converter';

export type FindQueryToFindQueryTypeOrmConverter<TModelDb, TQuery> =
  | Converter<TQuery, FindConditions<TModelDb>>
  | Converter<
      TQuery,
      QueryBuilder<TModelDb> & WhereExpressionBuilder,
      QueryBuilder<TModelDb> & WhereExpressionBuilder
    >;
