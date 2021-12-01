import { applyDecorators } from '@nestjs/common';
import {
    BaseDecorator, BaseDecoratorWithBody,
    BaseDecoratorWithParam,
    BaseDecoratorWithQuery,
    ControllerDecorator,
} from '../../utils/decorator';
import {
    getExhibitionsSortedByDeadlineApiOperation,
    getExhibitionsSortedByInterestApiOperation,
    getExhibtionIdsApiOperation,
    getNewestExhibitionApiOperation,
    getRandomExhibitionsAPiOperation,
    getSpecificExhibitionApiOperation,
    holdExhibitionApiBody,
    updateExhibitionApiOperation,
} from '../swagger';
import { ExhibitionDetailDTO, ExhibitionDto, HoldExhibitionDTO } from '../dto/exhibition.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';

export const _ExhibitionController = () => {
    return applyDecorators(
        ControllerDecorator('exhibitions', '전시회 컨트롤러'),
    );
};

export const GetExhibitionsIdsApi = () => {
    return applyDecorators(
        BaseDecorator(
            getExhibtionIdsApiOperation,
            { type: [Number] },
        ),
    );
};

export const GetRandomExhibitionsApi = () => {
    return applyDecorators(
        BaseDecorator(
            getRandomExhibitionsAPiOperation,
            { type: [ExhibitionDto] },
        ),
    );
};

export const GetNewestExhibitionsApi = () => {
    return applyDecorators(
        BaseDecoratorWithQuery(
            getNewestExhibitionApiOperation,
            { type: [ExhibitionDto] },
            { name: 'page', type: Number },
        ),
    );
};

export const GetExhibitionsSortedByDeadlineApi = () => {
    return applyDecorators(
        BaseDecoratorWithQuery(
            getExhibitionsSortedByDeadlineApiOperation,
            { type: [ExhibitionDto] },
            { name: 'page', type: Number },
        ),
    );
};

export const GetExhibitionsSortedByInterestApi = () => {
    return applyDecorators(
        BaseDecoratorWithQuery(
            getExhibitionsSortedByInterestApiOperation,
            { type: [ExhibitionDto] },
            { name: 'page', type: Number },
        ),
    );
};

export const GetSpecificExhibitionApi = () => {
    return applyDecorators(
        BaseDecoratorWithParam(
            getSpecificExhibitionApiOperation,
            { type: ExhibitionDetailDTO },
            { name: 'exhibitionId', type: Number },
        ),
    );
};

export const HoldExhibitionApi = () => {
    return applyDecorators(
        BaseDecoratorWithBody(
            { summary: '전시회 등록 api' },
            { type: ExhibitionDetailDTO },
            holdExhibitionApiBody,
        ),
        ApiConsumes('multipart/form-data'),
    );
};

export const UpdateExhibitionApi = () => {
    return applyDecorators(
        BaseDecoratorWithBody(
            updateExhibitionApiOperation,
            { type: UpdateResult },
            holdExhibitionApiBody,
        ),
    );
};
