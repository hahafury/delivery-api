import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@app/common/base/base.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column()
  public title: string;

  @Column()
  public image: string;
}
