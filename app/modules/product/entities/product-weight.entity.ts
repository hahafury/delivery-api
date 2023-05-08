import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@app/common/base/base.entity';
import { ProductWeightUnit } from '@app/modules/product/enums/product-weight-unit.enum';

@Entity('product_weight')
export class ProductWeightEntity extends BaseEntity {
  @Column()
  public value: number;

  @Column({
    type: 'enum',
    enum: ProductWeightUnit,
    default: ProductWeightUnit.GRAM,
  })
  public unit: ProductWeightUnit;
}
