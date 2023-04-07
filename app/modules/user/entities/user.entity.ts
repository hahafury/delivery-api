import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  Generated,
} from 'typeorm';
import { UserCredentialsEntity } from './user-credentials.entity';
import { UserRole } from '@app/modules/user/enums/user-role.enum';
import { AggregateRoot } from '@nestjs/cqrs';

@Entity('user')
export class UserEntity extends AggregateRoot {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  public id: string;

  @Column({ default: UserRole.USER })
  public role: string;

  @Column()
  public phone: string;

  @Column({ nullable: true })
  public email: string;

  @OneToOne(() => UserCredentialsEntity, (credentials) => credentials.user, {
    cascade: true,
  })
  @JoinColumn()
  public credentials: UserCredentialsEntity;
}
