import { applyDecorators } from '@nestjs/common';
import { BaseDecorator, BaseDecoratorWithQuery, ControllerDecorator } from '../../utils/decorator';
import { AuctionDetailDTO, AuctionListItemDTO } from '../dto/auction.dto';
import {
    getAuctionDetailApiOperation,
    getAuctionIdsApiOperation,
    getAuctionsSortedByNewsestApiOperation,
    getAuctionsSortedByPopularApiOperation,
    getRandomAuctionsApiOperation,
} from '../swagger';

export const _AuctionController = () => {
    return applyDecorators(
        ControllerDecorator('auctions', '옥션 컨트롤러'),
    );
};

export const GetExhibitionIdsApi = () => {
    return applyDecorators(
        BaseDecorator(
            getAuctionIdsApiOperation,
            { type: Number },
        ),
    );
};

export const GetRandomAuctionsApi = () => {
    return applyDecorators(
        BaseDecorator(
            getRandomAuctionsApiOperation,
            { type: AuctionListItemDTO },
        ),
    );
};

export const GetAuctionsOrderByNewestApi = () => {
    return applyDecorators(
        BaseDecoratorWithQuery(
            getAuctionsSortedByNewsestApiOperation,
            { type: AuctionListItemDTO },
            { name: 'page', type: Number },
        ),
    );
};

export const GetAuctionsOrderByPopularApi = () => {
    return applyDecorators(
        BaseDecoratorWithQuery(
            getAuctionsSortedByPopularApiOperation,
            { type: AuctionListItemDTO },
            { name: 'page', type: Number },
        ),
    );
};

export const GetAuctionDetailApi = () => {
    return applyDecorators(
        BaseDecorator(
            getAuctionDetailApiOperation,
            { type: AuctionDetailDTO },
        ),
    );
};
