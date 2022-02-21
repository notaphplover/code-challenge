import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';

import { UserTypeOrm } from '../../../../user/integration/typeOrm/model/UserTypeOrm';

@Entity('Exercise')
export class ExerciseTypeOrm {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  public id!: string;

  @Column({ name: 'content', type: 'text' })
  public content!: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  public createdAt!: Date;

  @ManyToOne(() => UserTypeOrm, {
    nullable: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  public user!: UserTypeOrm | undefined;

  @RelationId((exerciseTypeOrm: ExerciseTypeOrm) => exerciseTypeOrm.user)
  public userId!: string;
}
