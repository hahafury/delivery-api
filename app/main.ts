import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from '@libs/logging/logging.interceptor';
import { HttpExceptionFilter } from '@libs/filters/http-exception.filter';
import { Config } from '@app/app.config';
import { AppModule } from '@app/app.module';
import helmet from 'helmet';
import * as compression from 'compression';

function setupSwagger(app: INestApplication): void {
  const documentBuilder: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Nest.js example')
    .setDescription('This is example for nest.js')
    .setVersion('1.0')
    .addBasicAuth()
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    documentBuilder,
  );
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
}

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  setupSwagger(app);
  await app.listen(Config.PORT);
}

bootstrap();
