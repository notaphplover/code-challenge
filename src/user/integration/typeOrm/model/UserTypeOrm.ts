import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserTypeOrm {
  @PrimaryColumn({ length: 36, name: 'id', type: 'varchar' })
  public id!: string;
  @Column({ length: 100, name: 'name', type: 'varchar' })
  @Index({ unique: true })
  public name!: string;
}
