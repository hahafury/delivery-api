import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_credentials')
export class UserCredentialsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  pin: string;

  @Column({ nullable: true })
  currentHashedRefreshToken: string;

  @OneToOne(() => UserEntity, (user) => user.credentials)
  user: UserEntity;
}
