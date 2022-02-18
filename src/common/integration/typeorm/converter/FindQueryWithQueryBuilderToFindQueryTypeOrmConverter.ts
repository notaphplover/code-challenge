import { FindConditions, QueryBuilder, WhereExpressionBuilder } from 'typeorm';

import { Converter } from '../../../domain/converter/Converter';

export type FindQueryWithQueryBuilderToFindQueryTypeOrmConverter<
  TModelDb,
  TQuery,
> = Converter<
  TQuery,
  FindConditions<TModelDb> | (QueryBuilder<TModelDb> & WhereExpressionBuilder),
  QueryBuilder<TModelDb> & WhereExpressionBuilder
>;
