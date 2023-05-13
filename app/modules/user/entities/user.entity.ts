import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserRole } from '@app/modules/user/enums/user-role.enum';
import { BaseEntity } from '@app/common/base';
import { ProductEntity } from '@app/modules/product/entities';
import { UserCredentialsEntity } from './user-credentials.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
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

  @ManyToMany(() => ProductEntity, { eager: true })
  @JoinTable({
    name: 'user_favorite_products',
  })
  public favoriteProducts: ProductEntity[];
}
