import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExhibitionRepository } from '../exhibition.repository';
import { ExhibitionDTO, HoldExhibitionDTO } from '../dto/exhibitionDTO';
import { User } from 'src/user/user.entity';
import { ImageService } from 'src/image/service/image.service';
import { ArtworkRepository } from 'src/artwork/artwork.repository';

@Injectable()
export class ExhibitionService {
    constructor(
        @InjectRepository(ExhibitionRepository)
        private exhibitionRepository: ExhibitionRepository,
        @InjectRepository(ArtworkRepository)
        private artworkRepository: ArtworkRepository,
        private readonly imageService: ImageService,
    ) {}

    async getRandomExhibitions(): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.getRandomExhibitions();
        return Promise.all(
            exhibitions.map(async exhibition => {
                const artworks = await this.artworkRepository.findAllByExhibitionId(exhibition.id);
                return ExhibitionDTO.from(exhibition, artworks);
            }),
        );
    }

    async getNewestExhibitions(page: number): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.getNewestExhibitions(page);
        return Promise.all(
            exhibitions.map(async exhibition => {
                const artworks = await this.artworkRepository.findAllByExhibitionId(exhibition.id);
                return ExhibitionDTO.from(exhibition, artworks);
            }),
        );
    }

    async getExhibitionsSortedByDeadline(page: number): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.getExhibitionsSortedByDeadline(page);
        return Promise.all(
            exhibitions.map(async exhibition => {
                const artworks = await this.artworkRepository.findAllByExhibitionId(exhibition.id);
                return ExhibitionDTO.from(exhibition, artworks);
            }),
        );
    }

    async getExhibitionsSortedByInterest(page: number): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.getExhibitionsSortedByInterest(page);
        return Promise.all(
            exhibitions.map(async exhibition => {
                const artworks = await this.artworkRepository.findAllByExhibitionId(exhibition.id);
                return ExhibitionDTO.from(exhibition, artworks);
            }),
        );
    }

    async holdExhibition(
        image: Express.Multer.File,
        holdExhibitionDTO: HoldExhibitionDTO,
        user: User,
    ): Promise<ExhibitionDTO> {
        const croppedThumbnail = await this.imageService.cropImage(image);
        const thumbnailPath = await this.imageService.fileUpload({ ...image, buffer: croppedThumbnail });

        const newExhibition = this.exhibitionRepository.createExhibition(
            thumbnailPath.Location,
            holdExhibitionDTO,
            user,
        );

        this.exhibitionRepository.save(newExhibition);
        return ExhibitionDTO.from(newExhibition, []);
    }
}
