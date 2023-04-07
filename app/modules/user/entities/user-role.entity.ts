import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_role')
export class UserRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  pin: string;

  @Column({ nullable: true })
  currentHashedRefreshToken: string;

  @OneToOne(() => UserEntity, (user) => user.role)
  user: UserEntity;
}
