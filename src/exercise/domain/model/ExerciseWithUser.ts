import { User } from '../../../user/domain/model/User';

export interface ExerciseWithUser {
  createdAt: Date;
  content: string;
  id: string;
  user: User;
}
