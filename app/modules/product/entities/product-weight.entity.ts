import { Column, Entity, OneToOne } from 'typeorm';
import { BaseWithHiddenPrimaryEntity } from '@app/common/base';
import { ProductWeightUnit } from '../enums';
import { ProductEntity } from './product.entity';

@Entity('product_weight')
export class ProductWeightEntity extends BaseWithHiddenPrimaryEntity {
  @Column({
    type: 'enum',
    enum: ProductWeightUnit,
    default: ProductWeightUnit.GRAM,
  })
  public unit: ProductWeightUnit;

  @Column()
  public value: number;

  @OneToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  public product: ProductEntity;
}
