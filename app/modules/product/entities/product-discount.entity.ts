import { Column, Entity, OneToOne } from 'typeorm';
import { BaseWithHiddenPrimaryEntity } from '@app/common/base';
import { ProductDiscountType } from '../enums';
import { ProductEntity } from './product.entity';

@Entity('product_discount')
export class ProductDiscountEntity extends BaseWithHiddenPrimaryEntity {
  @Column()
  public value: number;

  @Column({
    type: 'enum',
    enum: ProductDiscountType,
    default: ProductDiscountType.NUMBER,
  })
  public type: ProductDiscountType;

  @OneToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  public product: ProductEntity;
}
