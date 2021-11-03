import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
dotenv.config();
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

    app.enableCors({ origin: 'http://localhost:3000', credentials: true });
    app.setGlobalPrefix('/api');
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT);
}

bootstrap();
