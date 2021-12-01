import { applyDecorators, UseGuards } from '@nestjs/common';
import { BaseDecorator, BaseDecoratorWithBody, ControllerDecorator } from '../../utils/decorator';
import { CustomAuthGuard } from '../../auth/guard/CustomAuthGuard';
import { User } from '../user.entity';
import {
    getBiddedArtworksApiOperation,
    getBiddingArtworksApiOperation,
    getInterestArtworksApiOperation,
    getUserProfile,
    getUsersArtworksApiOperation, getUsersExhibitionsApiOperation,
    updateUserProfileApiBody,
    updateUserProfileApiOperation,
} from '../swagger';
import { UpdateResult } from 'typeorm';
import { Artwork } from '../../artwork/artwork.entity';
import { Exhibition } from '../../exhibition/exhibition.entity';

export const _UserController = () => {
    return applyDecorators(
        ControllerDecorator('users', '유저 컨트롤러'),
        UseGuards(CustomAuthGuard),
    );
};

export const GetUserProfileApi = () => {
    return applyDecorators(
        BaseDecorator(
            getUserProfile,
            { type: User },
        ),
    );
};

export const UpdateUserProfileApi = () => {
    return applyDecorators(
        BaseDecoratorWithBody(
            updateUserProfileApiOperation,
            { type: UpdateResult },
            updateUserProfileApiBody,
        ),
    );
};

export const GetUsersArtworksApi = () => {
    return applyDecorators(
        BaseDecorator(
            getUsersArtworksApiOperation,
            { type: [Artwork] },
        ),
    );
};

export const GetInterestArtworksApi = () => {
    return applyDecorators(
        BaseDecorator(
            getInterestArtworksApiOperation,
            { type: [Artwork] },
        ),
    );
};

export const GetBiddingArtworksApi = () => {
    return applyDecorators(
        BaseDecorator(
            getBiddingArtworksApiOperation,
            { type: [Artwork] },
        ),
    );
};

export const GetBiddedArtworksApi = () => {
    return applyDecorators(
        BaseDecorator(
            getBiddedArtworksApiOperation,
            { type: [Artwork] },
        ),
    );
};

export const GetUsersExhibitionsApi = () => {
    return applyDecorators(
        BaseDecorator(
            getUsersExhibitionsApiOperation,
            { type: [Exhibition] },
        ),
    );
};
