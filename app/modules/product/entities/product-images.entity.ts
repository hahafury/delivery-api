import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseWithHiddenPrimaryEntity } from '@app/common/base/base-with-hidden-primary.entity';
import { ProductEntity } from './product.entity';

@Entity('product_images')
export class ProductImagesEntity extends BaseWithHiddenPrimaryEntity {
  @Column()
  public uri: string;

  @Column({ nullable: true })
  public alt: string;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  public product: ProductEntity;
}
