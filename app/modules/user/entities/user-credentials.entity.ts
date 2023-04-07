import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  PrimaryColumn,
  Generated,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_credentials')
export class UserCredentialsEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  public id: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  pin: string;

  @Column({ nullable: true })
  currentHashedRefreshToken: string;

  @OneToOne(() => UserEntity, (user) => user.credentials)
  user: UserEntity;
}
