import {
    DocumentBuilder,
    OpenAPIObject,
    SwaggerDocumentOptions,
} from '@nestjs/swagger';

interface SwaggerUIConfig {
    openAPIObject: Omit<OpenAPIObject, 'paths'>;
    options: SwaggerDocumentOptions;
}

export const swaggerUIConfig: SwaggerUIConfig = {
    openAPIObject: new DocumentBuilder()
        .setTitle('벽전 Swagger')
        .setDescription('벽전 API 명세서')
        .setVersion('1.0')
        .setBasePath('/api')
        .build(),

    options: {
        operationIdFactory: (controllerKey: string, methodKey: string) =>
            `${controllerKey}_${methodKey}`,
    },
};
