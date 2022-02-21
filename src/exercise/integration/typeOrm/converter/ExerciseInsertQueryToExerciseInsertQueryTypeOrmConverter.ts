import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Converter } from '../../../../common/domain/converter/Converter';
import { ExerciseInsertQuery } from '../../../domain/query/ExerciseInsertQuery';
import { ExerciseTypeOrm } from '../model/ExerciseTypeOrm';

@Injectable()
export class ExerciseInsertQueryToExerciseInsertQueryTypeOrmConverter
  implements Converter<ExerciseInsertQuery, DeepPartial<ExerciseTypeOrm>>
{
  public convert(
    exerciseInsertQuery: ExerciseInsertQuery,
  ): DeepPartial<ExerciseTypeOrm> {
    const exerciseInsertQueryTypeOrm: DeepPartial<ExerciseTypeOrm> = {
      content: exerciseInsertQuery.content,
      createdAt: new Date(),
      id: uuidV4(),
      user: { id: exerciseInsertQuery.userId },
    };

    return exerciseInsertQueryTypeOrm;
  }
}
