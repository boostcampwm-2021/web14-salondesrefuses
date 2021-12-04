import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ExhibitionDetailDTO, ExhibitionDto, HoldExhibitionDTO } from './dto/exhibition.dto';
import { ExhibitionRepository } from './exhibition.repository';
import { ArtworkRepository } from '@artwork/artwork.repository';
import { ArtworkStatus } from '@artwork/enum/artwork.enum';
import { ImageService } from '@image/image.service';
import { Exhibition } from './exhibition.entity';
import { User } from '@user/user.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class ExhibitionService {
    constructor(
        private readonly exhibitionRepository: ExhibitionRepository,
        private readonly artworkRepository: ArtworkRepository,
        private readonly imageService: ImageService,
    ) {}

    async getExhibitionIds(): Promise<number[]> {
        return (await this.exhibitionRepository.find()).map(exhibition => exhibition.id);
    }

    async getSpecificExhibition(id: number): Promise<ExhibitionDetailDTO> {
        const exhibition = await this.exhibitionRepository.findExhibition(id);
        if (!exhibition) {
            throw new NotFoundException(`Can't find exhibition with id: ${id}`);
        }

        const artworks = await this.artworkRepository.findAllByArtworkIds(JSON.parse(exhibition.artworkIds), [
            'auction',
            'artist',
        ]);
        return ExhibitionDetailDTO.from(exhibition, artworks);
    }

    async getRandomExhibitions(): Promise<ExhibitionDto[]> {
        const exhibitions = await this.exhibitionRepository.findRandomExhibitions();
        return this.convertAllToExhibitionDTOWithInBidArtwork(exhibitions);
    }

    async getNewestExhibitions(page: number): Promise<ExhibitionDto[]> {
        const exhibitions = await this.exhibitionRepository.findNewestExhibitions(page);
        return this.convertAllToExhibitionDTOWithInBidArtwork(exhibitions);
    }

    async getExhibitionsSortedByDeadline(page: number): Promise<ExhibitionDto[]> {
        const exhibitions = await this.exhibitionRepository.findExhibitionsSortedByDeadline(page);
        return this.convertAllToExhibitionDTOWithInBidArtwork(exhibitions);
    }

    async getExhibitionsSortedByInterest(page: number): Promise<ExhibitionDto[]> {
        const exhibitions = await this.exhibitionRepository.findExhibitionsSortedByInterest(page);
        return this.convertAllToExhibitionDTOWithInBidArtwork(exhibitions);
    }

    private async convertAllToExhibitionDTOWithInBidArtwork(exhibitions: Exhibition[]): Promise<ExhibitionDto[]> {
        const artworkIdAll = exhibitions.reduce(
            (prev, exhibition) => [...prev, ...JSON.parse(exhibition.artworkIds)],
            [],
        );
        const artworks = await this.artworkRepository.findAllByArtworkIds(artworkIdAll);

        return exhibitions.map(exhibition => {
            const isSale = JSON.parse(exhibition.artworkIds).some(artworkId => {
                const found = artworks.find(artwork => artwork.id === Number(artworkId));
                return found.status === ArtworkStatus.InBid;
            });
            return ExhibitionDto.from(exhibition, isSale);
        });
    }

    async holdExhibition(
        image: Express.Multer.File,
        holdExhibitionDTO: HoldExhibitionDTO,
        user: User,
    ): Promise<ExhibitionDetailDTO> {
        try {
            const webpImage = await this.imageService.convertWebp(image);

            const croppedThumbnail = await this.imageService.cropImage({ ...image, buffer: webpImage });
            const thumbnailPath = await this.imageService.fileUpload({ ...image, buffer: croppedThumbnail });

            const newExhibition = this.exhibitionRepository.createExhibition(
                thumbnailPath.Location,
                holdExhibitionDTO,
                user,
            );

            const [exhibition, artworks] = await Promise.all([
                this.exhibitionRepository.save(newExhibition),
                this.artworkRepository.findAllByArtworkIds(JSON.parse(holdExhibitionDTO.artworkIds), [
                    'auction',
                    'artist',
                ]),
            ]);

            return ExhibitionDetailDTO.from(exhibition, artworks);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'create exhibition failed',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateExhibition(image: Express.Multer.File, updatedExhibition: HoldExhibitionDTO): Promise<UpdateResult> {
        let result;
        if (!image) {
            const webpImage = await this.imageService.convertWebp(image);
            const croppedThumbnail = await this.imageService.cropImage({ ...image, buffer: webpImage });
            const thumbnailPath = await this.imageService.fileUpload({ ...image, buffer: croppedThumbnail });

            result = await this.exhibitionRepository.update(updatedExhibition.id, {
                ...updatedExhibition,
                thumbnailImage: thumbnailPath.Location,
            });
        } else {
            result = await this.exhibitionRepository.update(updatedExhibition.id, { ...updatedExhibition });
        }

        if (!result.affected) {
            throw new NotFoundException(`Can't find exhibition with id: ${updatedExhibition.id}`);
        }

        return result;
    }
}
