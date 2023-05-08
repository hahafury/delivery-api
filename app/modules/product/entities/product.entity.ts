import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '@app/common/base/base.entity';
import { CategoryEntity } from '@app/modules/category/category.entity';
import { ProductImagesEntity } from '@app/modules/product/entities/product-images.entity';
import { ProductWeightEntity } from '@app/modules/product/entities/product-weight.entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @Column()
  public title: string;

  @Column()
  public price: number;

  @Column()
  public preview: string;

  @OneToOne(() => ProductWeightEntity)
  @JoinColumn()
  public weight: ProductWeightEntity;

  @OneToMany(() => ProductImagesEntity, (image) => image.product)
  @JoinColumn()
  public images: ProductImagesEntity[];

  @OneToOne(() => CategoryEntity)
  @JoinColumn()
  public category: CategoryEntity;
}
