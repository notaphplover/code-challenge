import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserTypeOrm {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  public id!: string;
  @Column({ length: 100, name: 'name', type: 'varchar' })
  @Index({ unique: true })
  public name!: string;
}
