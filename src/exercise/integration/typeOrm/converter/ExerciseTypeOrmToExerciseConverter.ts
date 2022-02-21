import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/converter/Converter';
import { Exercise } from '../../../domain/model/Exercise';
import { ExerciseTypeOrm } from '../model/ExerciseTypeOrm';

@Injectable()
export class ExerciseTypeOrmToExerciseConverter
  implements Converter<ExerciseTypeOrm, Exercise>
{
  public convert(exerciseTypeOrm: ExerciseTypeOrm): Exercise {
    const exercise: Exercise = {
      content: exerciseTypeOrm.content,
      createdAt: exerciseTypeOrm.createdAt,
      id: exerciseTypeOrm.id,
      userId: exerciseTypeOrm.userId,
    };

    return exercise;
  }
}
