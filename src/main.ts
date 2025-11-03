/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE ,OPTIONS',
    credentials: true,
  };
  app.enableCors(corsOptions);
  const config = new DocumentBuilder()
    .setTitle('infinity Assurance_webhook')
    .setDescription('webHookbackend')
    .setVersion('1.0')
    .addBearerAuth()  
    .build();


  const port = process.env.PORT || '5099';
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

