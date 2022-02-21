import { Injectable } from '@nestjs/common';
import { QueryBuilder, WhereExpressionBuilder } from 'typeorm';

import { Converter } from '../../../../common/domain/converter/Converter';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserTypeOrm } from '../model/UserTypeOrm';

@Injectable()
export class UserFindQueryToUserFindQueryTypeOrmConverter
  implements
    Converter<
      UserFindQuery,
      QueryBuilder<UserTypeOrm> & WhereExpressionBuilder,
      QueryBuilder<UserTypeOrm> & WhereExpressionBuilder
    >
{
  public convert(
    userFindQuery: UserFindQuery,
    queryBuilder: QueryBuilder<UserTypeOrm> & WhereExpressionBuilder,
  ): QueryBuilder<UserTypeOrm> & WhereExpressionBuilder {
    let resultingQueryBuilder: QueryBuilder<UserTypeOrm> &
      WhereExpressionBuilder = queryBuilder;

    if (userFindQuery.name !== undefined) {
      resultingQueryBuilder = resultingQueryBuilder
        .setParameter('name', userFindQuery.name)
        .andWhere(`${UserTypeOrm.name}.name = :name`);
    }

    return resultingQueryBuilder;
  }
}
