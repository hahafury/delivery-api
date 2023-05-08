import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '@app/common/base/base.entity';
import { CategoryEntity } from '@app/modules/category/category.entity';
import { ProductImagesEntity } from './product-images.entity';
import { ProductWeightEntity } from './product-weight.entity';
import { ProductNutritionalValueEntity } from './product-nutritional-value.entity';
import { ProductDiscountEntity } from '@app/modules/product/entities/product-discount.entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @Column()
  public title: string;

  @Column()
  public price: number;

  @Column()
  public preview: string;

  @Column()
  public description: string;

  @Column({ default: false })
  public isHidden: boolean;

  @OneToOne(() => ProductWeightEntity, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public weight: ProductWeightEntity;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn()
  public category: CategoryEntity;

  @OneToOne(() => ProductNutritionalValueEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public nutritionalValue: ProductNutritionalValueEntity;

  @OneToMany(() => ProductImagesEntity, (image) => image.product, {
    eager: true,
    onDelete: 'CASCADE',
  })
  public images: ProductImagesEntity[];

  @OneToOne(() => ProductDiscountEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public discount: ProductDiscountEntity;
}
