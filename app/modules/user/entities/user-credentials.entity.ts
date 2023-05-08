import { Entity, Column, OneToOne } from 'typeorm';
import { BaseWithHiddenPrimaryEntity } from '@app/common/base';
import { UserEntity } from './user.entity';

@Entity('user_credentials')
export class UserCredentialsEntity extends BaseWithHiddenPrimaryEntity {
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  pin: string;

  @Column({ nullable: true })
  currentHashedRefreshToken: string;

  @OneToOne(() => UserEntity, (user) => user.credentials)
  user: UserEntity;
}
