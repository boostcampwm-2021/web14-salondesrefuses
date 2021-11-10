import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExhibitionRepository } from '../exhibition.repository';
import { ExhibitionDTO } from '../dto/exhibitionDTO';
import { HoldExhibitionDTO } from '../dto/exhibitionDTOs';
import { User } from 'src/user/user.entity';
import { ImageService } from 'src/image/service/image.service';

@Injectable()
export class ExhibitionService {
    constructor(
        @InjectRepository(ExhibitionRepository)
        private exhibitionRepository: ExhibitionRepository,
        private readonly imageService: ImageService,
        private readonly categoryService: CategoryService,
    ) {}

    async getRandomExhibitions(): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.getRandomExhibitions();
        return exhibitions.map(exhibition => ExhibitionDTO.from(exhibition));
    }

    async getNewestExhibitions(page: number): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.getNewestExhibitions(page);
        return exhibitions.map(exhibition => ExhibitionDTO.from(exhibition));
    }

    async getExhibitionsSortedByDeadline(page: number): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.getExhibitionsSortedByDeadline(page);
        return exhibitions.map(exhibition => ExhibitionDTO.from(exhibition));
    }

    async getExhibitionsSortedByInterest(page: number): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.getExhibitionsSortedByInterest(page);
        return exhibitions.map(exhibition => ExhibitionDTO.from(exhibition));
    }

    async holdExhibition(image: Express.Multer.File, holdExhibitionDTO: HoldExhibitionDTO, user: User) {
        const [thumbnailPath, categories] = await Promise.all([
            this.imageService.fileUpload(image),
            this.categorySerivce.getCategories(holdExhibitionDTO.categories),
        ]);
        this.exhibitionRepository.createExhibition(thumbnailPath.Location, holdExhibitionDTO, user, categories);
    }
}
