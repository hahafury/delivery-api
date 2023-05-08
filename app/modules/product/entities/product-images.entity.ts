import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@app/common/base/base.entity';
import { ProductEntity } from '@app/modules/product/entities/product.entity';

@Entity('product_images')
export class ProductImagesEntity extends BaseEntity {
  @Column()
  public uri: string;

  @Column()
  public alt: string;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  public product: ProductEntity;
}
