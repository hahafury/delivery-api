import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from '@app/common/config';
import { UserModule } from '@app/modules/user';
import { CategoryModule } from '@app/modules/category';
import { ProductModule } from '@app/modules/product';

@Module({
  imports: [
    TypeOrmModule.forRoot(DATABASE_CONFIG),
    UserModule,
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {}
