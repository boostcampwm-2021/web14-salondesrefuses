import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExhibitionRepository } from '../exhibition.repository';
import { ExhibitionDetailDTO, ExhibitionDTO, HoldExhibitionDTO, UpdateExhibitionDTO } from '../dto/exhibitionDTO';
import { User } from 'src/user/user.entity';
import { ImageService } from 'src/image/service/image.service';
import { ArtworkRepository } from 'src/artwork/artwork.repository';
import { UpdateResult } from 'typeorm';
import { ArtworkStatus } from '../../artwork/artwork.status.enum';

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
        const exhibitions = await this.exhibitionRepository.getRandomExhibitions();
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

    async getNewestExhibitions(page: number): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.getNewestExhibitions(page);
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

    async getExhibitionsSortedByDeadline(page: number): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.getExhibitionsSortedByDeadline(page);
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

    async getExhibitionsSortedByInterest(page: number): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.getExhibitionsSortedByInterest(page);
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

        const [exhibiton, artworks] = await Promise.all([
            this.exhibitionRepository.save(newExhibition),
            this.artworkRepository.findByArtworkIds(JSON.parse(holdExhibitionDTO.artworkIds), ['auction', 'artist']),
        ]);

        return ExhibitionDetailDTO.from(exhibiton, artworks);
    }

    async updateExhibition({ id, contents }: UpdateExhibitionDTO): Promise<UpdateResult> {
        return await this.exhibitionRepository.update(id, { contents });
    }
}
