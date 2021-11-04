import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
dotenv.config();
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerUIConfig } from './config/swagger.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3001;
    const document = SwaggerModule.createDocument(
        app,
        swaggerUIConfig.openAPIObject,
        swaggerUIConfig.options,
    );

    app.use(cookieParser());
    app.setGlobalPrefix('/api');
    SwaggerModule.setup('swagger', app, document);
    process.env.NODE_ENV === 'development' &&
        app.enableCors({ origin: process.env.FRONT_HOST, credentials: true });

    await app.listen(PORT);
}

bootstrap();
