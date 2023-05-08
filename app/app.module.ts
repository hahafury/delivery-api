import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/modules/user/user.module';
import { DATABASE_CONFIG } from '@app/common/config/database.config';
import { CategoryModule } from '@app/modules/category/category.module';
import { ProductModule } from '@app/modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DATABASE_CONFIG),
    UserModule,
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {}
