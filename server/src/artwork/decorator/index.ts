import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { BaseDecoratorWithBody, BaseDecoratorWithParam, ControllerDecorator } from '@utils/decorator';
import { Artwork } from '../artwork.entity';
import { NewArtworkDTO } from '../dto/artwork.dto';
import { InterestArtwork } from '@interestArtwork/interestArtwork.entity';
import { UpdateResult } from 'typeorm';
import {
    createArtworkApiBody,
    createArtWorkApiOperation,
    getArtworkApiOperation,
    interestApiOperation,
    updateNFTTokenApiOperation,
} from '../swagger';

export const _ArtworkController = () => {
    return applyDecorators(
        ControllerDecorator('artworks', '작품 컨트롤러'),
    );
};

export const GetArtworkApi = () => {
    return applyDecorators(
        BaseDecoratorWithParam(
            getArtworkApiOperation,
            { type: Artwork },
            { name: 'artworkId', type: Number }
        ),
    );
};

export const PostArtworkApi = () => {
    return applyDecorators(
        BaseDecoratorWithBody(
            createArtWorkApiOperation,
            { type: NewArtworkDTO },
            createArtworkApiBody
        ),
        ApiConsumes('multipart/form-data'),
    );
};

export const InterestArtworkApi = () => {
    return applyDecorators(
        BaseDecoratorWithBody(
            interestApiOperation,
            { type: Boolean },
            { type: InterestArtwork }
        ),
    );
};

export const UpdateNFTTokenApi = () => {
    return applyDecorators(
        BaseDecoratorWithParam(
            updateNFTTokenApiOperation,
            { type: UpdateResult },
            { name: 'artworkId', type: Number }
        ),
        ApiBody({ type: String }),
    );
};
