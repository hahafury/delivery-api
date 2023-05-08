import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import {
  AbstractHttpAdapter,
  HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';
import * as session from 'express-session';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';
import { ResponseInterceptor } from '@app/common/interceptors';
import { HttpExceptionFilter } from '@app/common/filters';
import { AppModule } from './app.module';

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
  const httpAdapterHost: HttpAdapterHost<AbstractHttpAdapter<any, any, any>> =
    app.get(HttpAdapterHost);
  const redisClient: Redis = new Redis(6379, 'cache', {
    password: process.env.REDIS_PASSWORD,
  });

  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
      }),
      name: process.env.REDIS_AUTH_TOKEN_SESSION,
      secret: process.env.REDIS_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );
  app.use(cookieParser());
  app.use(express.json());
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(helmet());
  app.use(compression());
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors): BadRequestException => {
        return new BadRequestException(
          errors
            .map((error) => {
              return Object.entries(
                error.constraints ?? error.children[0].constraints,
              )
                .map((entry) => entry[1])
                .join();
            })
            .join(', '),
        );
      },
    }),
  );
  setupSwagger(app);
  await app.listen(3000, () => {
    console.log('Server started');
  });
}

bootstrap();
