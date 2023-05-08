import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserEntity } from '@app/modules/user/entities/user.entity';
import { UserCredentialsEntity } from '@app/modules/user/entities/user-credentials.entity';
import { CategoryEntity } from '@app/modules/category/category.entity';
import { ProductEntity } from '@app/modules/product/entities/product.entity';
import { ProductWeightEntity } from '@app/modules/product/entities/product-weight.entity';
import { ProductImagesEntity } from '@app/modules/product/entities/product-images.entity';

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
  ],
  migrationsTableName: 'migration',
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  ssl: process.env.NODE_ENV === 'production',
};
