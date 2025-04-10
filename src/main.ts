import { NestFactory } from '@nestjs/core';
import { INestApplication, ExceptionFilter } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  const app: INestApplication =
    await NestFactory.create<INestApplication>(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter() as unknown as ExceptionFilter);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Authentication API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  console.log(
    `Application running in ${configService.get<string>('NODE_ENV')} mode`,
  );
  app.enableCors({
    origin: '*',
  });
  await app.listen(3001);
}

bootstrap();
