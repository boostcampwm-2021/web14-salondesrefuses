import { applyDecorators } from '@nestjs/common';
import { BaseDecorator, BaseDecoratorWithBody, ControllerDecorator } from '@utils/decorator';
import { Category } from '../category.entity';
import { postCategoriesApiBody } from '../swagger';

export const _CategoryController = () => {
    return applyDecorators(
        ControllerDecorator('categories', '카테고리 컨트롤러'),
    );
};

export const GetCategoriesApi = () => {
    return applyDecorators(
        BaseDecorator(
            { summary: '카테고리 조회 API' },
            { type: [Category] },
        ),
    );
};

export const PostCategoriesApi = () => {
    return applyDecorators(
        BaseDecoratorWithBody(
            { summary: '카테고리 생성 API' },
            { type: Category },
            postCategoriesApiBody,
        ),
    );
};
