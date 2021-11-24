import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExhibitionRepository } from './exhibition.repository';
import { ExhibitionDetailDTO, ExhibitionDTO, HoldExhibitionDTO, UpdateExhibitionDTO } from './dto/exhibitionDTO';
import { User } from 'src/user/user.entity';
import { ImageService } from 'src/image/image.service';
import { ArtworkRepository } from 'src/artwork/artwork.repository';
import { UpdateResult } from 'typeorm';
import { ArtworkStatus } from '../artwork/artwork.status.enum';
import { Exhibition } from './exhibition.entity';

@Injectable()
export class ExhibitionService {
    constructor(
        @InjectRepository(ExhibitionRepository)
        private exhibitionRepository: ExhibitionRepository,
        @InjectRepository(ArtworkRepository)
        private artworkRepository: ArtworkRepository,
        private readonly imageService: ImageService,
    ) {
    }

    async getSpecificExhibition(id: number): Promise<ExhibitionDetailDTO> {
        const exhibition = await this.exhibitionRepository.getSpecificExhibition(id);
        const artworks = await this.artworkRepository.findByArtworkIds(JSON.parse(exhibition.artworkIds), [
            'auction',
            'artist',
        ]);
        return ExhibitionDetailDTO.from(exhibition, artworks);
    }

    async getRandomExhibitions(): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.findRandomExhibitions();
        return this.convertAllToExhibitionDTOWithInBidArtwork(exhibitions);
    }

    async getNewestExhibitions(page: number): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.findNewestExhibitions(page);
        return this.convertAllToExhibitionDTOWithInBidArtwork(exhibitions);
    }

    async getExhibitionsSortedByDeadline(page: number): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.findExhibitionsSortedByDeadline(page);
        return this.convertAllToExhibitionDTOWithInBidArtwork(exhibitions);
    }

    async getExhibitionsSortedByInterest(page: number): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.findExhibitionsSortedByInterest(page);
        return this.convertAllToExhibitionDTOWithInBidArtwork(exhibitions);
    }

    private async convertAllToExhibitionDTOWithInBidArtwork(exhibitions: Exhibition[]): Promise<ExhibitionDTO[]> {
        const artworkIdAll = exhibitions.reduce((prev, exhibition) => [...prev, ...JSON.parse(exhibition.artworkIds)], []);
        const artworks = await this.artworkRepository.findAllByExhibitionId(artworkIdAll);

        return exhibitions.map(exhibition => {
            const isSale = JSON.parse(exhibition.artworkIds).some((artworkId) => {
                const found = artworks.find(artwork => artwork.id === Number(artworkId));
                return found.status === ArtworkStatus.InBid;
            });
            return ExhibitionDTO.from(exhibition, isSale);
        });
    }

    async holdExhibition(
        image: Express.Multer.File,
        holdExhibitionDTO: HoldExhibitionDTO,
        user: User,
    ): Promise<ExhibitionDetailDTO> {
        const croppedThumbnail = await this.imageService.cropImage(image);
        const thumbnailPath = await this.imageService.fileUpload({ ...image, buffer: croppedThumbnail });

        const newExhibition = this.exhibitionRepository.createExhibition(
            thumbnailPath.Location,
            holdExhibitionDTO,
            user,
        );

        const [exhibition, artworks] = await Promise.all([
            this.exhibitionRepository.save(newExhibition),
            this.artworkRepository.findByArtworkIds(JSON.parse(holdExhibitionDTO.artworkIds), ['auction', 'artist']),
        ]);

        return ExhibitionDetailDTO.from(exhibition, artworks);
    }

    updateExhibition({ id, contents }: UpdateExhibitionDTO): Promise<UpdateResult> {
        return this.exhibitionRepository.update(id, { contents });
    }
}
