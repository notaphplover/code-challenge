import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';

import { FindQueryToPaginatedFindQueryTypeOrmConverter } from '../../../../common/integration/typeorm/converter/FindQueryToPaginatedFindQueryTypeOrmConverter';
import { ExerciseFindQuery } from '../../../domain/query/ExerciseFindQuery';
import { ExerciseTypeOrm } from '../model/ExerciseTypeOrm';

@Injectable()
export class ExerciseFindQueryToExerciseFindTypeOrmQueryConverter
  implements
    FindQueryToPaginatedFindQueryTypeOrmConverter<
      ExerciseTypeOrm,
      ExerciseFindQuery
    >
{
  public convert(
    exerciseFindQuery: ExerciseFindQuery,
    queryBuilder: SelectQueryBuilder<ExerciseTypeOrm>,
  ): SelectQueryBuilder<ExerciseTypeOrm> {
    let resultingQueryBuilder: SelectQueryBuilder<ExerciseTypeOrm> =
      queryBuilder;

    if (exerciseFindQuery.limit !== undefined) {
      resultingQueryBuilder = resultingQueryBuilder.take(
        exerciseFindQuery.limit,
      );
    }

    if (exerciseFindQuery.userId !== undefined) {
      resultingQueryBuilder = resultingQueryBuilder
        .setParameter('userId', exerciseFindQuery.userId)
        .andWhere(`${ExerciseTypeOrm.name}.user_id = :userId`);
    }

    return resultingQueryBuilder;
  }
}
