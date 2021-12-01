import { applyDecorators, Controller } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

export const ControllerDecorator = (prefix, tags) => {
    return applyDecorators(
        Controller(prefix),
        ApiTags(tags),
    );
};

export const BaseDecorator = (operation, response) => {
    return applyDecorators(
        ApiOperation(operation),
        ApiResponse(response),
    );
};

export const BaseDecoratorWithParam = (operation, response, param) => {
    return applyDecorators(
        BaseDecorator(operation, response),
        ApiParam(param),
    );
};

export const BaseDecoratorWithBody = (operation, response, body) => {
    return applyDecorators(
        BaseDecorator(operation, response),
        ApiBody(body),
    );
};

export const BaseDecoratorWithQuery = (operation, response, query) => {
    return applyDecorators(
        BaseDecorator(operation, response),
        ApiQuery(query),
    );
};
