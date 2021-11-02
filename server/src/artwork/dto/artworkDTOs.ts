import { Auction } from 'src/auction/auction.entity';
import { ObjectStorageData } from 'src/image/dto/ImageDTOs';
import { Artwork } from '../artwork.entity';

export class CreateArtworkDTO {
    title: string;
    type: string;
    description: string;
    isRegisterAuction?: boolean;
    startAt?: Date;
    endAt?: Date;
    startBid?: string;

    public static convertArtworkEntity(
        createArtWorkDTO: CreateArtworkDTO,
        { Location: originalImagePath }: ObjectStorageData,
        { Location: croppedImagePath }: ObjectStorageData,
        nftToken: string,
    ): Artwork {
        const { title, type, description, isRegisterAuction, endAt } = createArtWorkDTO;
        const artwork = new Artwork();

        artwork.title = title;
        artwork.type = type;
        artwork.description = description;
        artwork.originalImage = originalImagePath;
        artwork.croppedImage = croppedImagePath;
        artwork.nftToken = nftToken;

        if (isRegisterAuction) {
            const newAuction = new Auction();
            newAuction.endAt = new Date(endAt);
            artwork.auction = newAuction;
        }

        return artwork;
    }
}
