import * as dotenv from 'dotenv';
dotenv.config();
import apm from 'nestjs-elastic-apm';

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiModule } from './api.module';
import { CustomRpcExceptionFilter } from './rpc-exception.filter';
import { GET_APP_LOGGER } from '@app/common/logger/logger.module';
import { API } from '@app/common/utils/paths';
import * as fs from "fs";
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';

async function bootstrap() {

  const isSecureMode = process.env.HTTP_PROTOCOL === "true"

  let httpsOptions: HttpsOptions | undefined

  if (isSecureMode) {
    console.log("Server launch in secure mode")
    const key = fs.readFileSync(process.env.SERVER_KEY_PATH)
    const cert = fs.readFileSync(process.env.SERVER_CERT_PATH)
    const ca = fs.readFileSync(process.env.CA_CERT_PATH)

    httpsOptions = {
      key,
      cert,
      ca,
      requestCert: true, // Request client certificate
      rejectUnauthorized: false, // Reject connections with invalid certificates
    };
  } else {
    console.log("Server launch in unsecure mode")
  }

  const app = await NestFactory.create(ApiModule, {
    httpsOptions,
    bodyParser: false,
    bufferLogs: true
  });

  app.useLogger(app.get(GET_APP_LOGGER))
  app.enableCors();
  app.useGlobalFilters(new CustomRpcExceptionFilter());
  app.setGlobalPrefix(API);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',

  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));


  const config = new DocumentBuilder()
    .setTitle('Get-App')
    .setDescription('The Get-App API swagger')
    .setVersion('0.5.4')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(Number(process.env.SERVER_PORT?? 3000))
}
bootstrap();
