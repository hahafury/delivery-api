import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserEntity, UserCredentialsEntity } from '@app/modules/user/entities';
import { CategoryEntity } from '@app/modules/category/category.entity';
import {
  ProductContentEntity,
  ProductNutritionalValueEntity,
  ProductImagesEntity,
  ProductWeightEntity,
  ProductEntity,
  ProductDiscountEntity,
} from '@app/modules/product/entities';

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [
    UserEntity,
    UserCredentialsEntity,
    CategoryEntity,
    ProductEntity,
    ProductWeightEntity,
    ProductImagesEntity,
    ProductNutritionalValueEntity,
    ProductContentEntity,
    ProductDiscountEntity,
  ],
  migrationsTableName: 'migration',
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  ssl: process.env.NODE_ENV === 'production',
};
