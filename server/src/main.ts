import * as dotenv from 'dotenv';
dotenv.config();

import 'pinpoint-node-agent';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerUIConfig } from '@config/swagger.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3001;
    app.setGlobalPrefix('/api');
    app.use(cookieParser());

    const document = SwaggerModule.createDocument(app, swaggerUIConfig.openAPIObject, swaggerUIConfig.options);

    SwaggerModule.setup('swagger', app, document);
    process.env.NODE_ENV === 'development' && app.enableCors({ origin: process.env.FRONT_HOST, credentials: true });

    const server = await app.listen(PORT);
    // server.keepAliveTimeout = 61 * 1000;
    // server.headersTimeout = 65 * 1000;
}

bootstrap();
