import { Column, Entity, OneToOne } from 'typeorm';
import { BaseWithHiddenPrimaryEntity } from '@app/common/base';
import { ProductEntity } from './product.entity';

@Entity('product_nutritional_value')
export class ProductNutritionalValueEntity extends BaseWithHiddenPrimaryEntity {
  @Column()
  public energy: number;

  @Column()
  public proteins: number;

  @Column()
  public fats: number;

  @Column()
  public carbohydrates: number;

  @OneToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  public product: ProductEntity;
}
