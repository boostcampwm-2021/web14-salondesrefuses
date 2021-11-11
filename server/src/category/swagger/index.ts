import { ApiBodyOptions } from '@nestjs/swagger';

export const postCategoriesApiBody: ApiBodyOptions = {
    schema: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
        },
    },
};
