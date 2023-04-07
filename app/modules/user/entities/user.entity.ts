import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserCredentialsEntity } from './user-credentials.entity';
import { UserRoleEntity } from '@app/modules/user/entities/user-role.entity';
import { UserRole } from '@app/modules/user/enums/user-role.enum';
import { AggregateRoot } from '@nestjs/cqrs';

@Entity('user')
export class UserEntity extends AggregateRoot {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public phone: string;

  @Column({ default: UserRole.USER })
  public type: string;

  @OneToOne(() => UserRoleEntity, (role) => role.user)
  public role: UserRoleEntity;

  @OneToOne(() => UserCredentialsEntity, (credentials) => credentials.user, {
    cascade: true,
  })
  @JoinColumn()
  public credentials: UserCredentialsEntity;
}
