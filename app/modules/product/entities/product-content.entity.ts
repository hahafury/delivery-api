import { Entity, ManyToOne } from 'typeorm';
import { BaseManyToOneEntity } from '@app/common/base';
import { ProductEntity } from './product.entity';

@Entity('product_content')
export class ProductContentEntity extends BaseManyToOneEntity {
  @ManyToOne(() => ProductEntity)
  public product: ProductEntity;

  @ManyToOne(() => ProductEntity)
  public for_product: ProductEntity;
}
