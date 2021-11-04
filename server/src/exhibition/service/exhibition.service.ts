import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExhibitionRepository } from '../exhibition.repository';
import { Exhibition } from "../exhibition.entity";

@Injectable()
export class ExhibitionService {
    constructor(
        @InjectRepository(ExhibitionRepository)
        private exhibitionRepository: ExhibitionRepository
    ) {}

    getRandomExhibitions(): Promise<Exhibition[]> {
        return this.exhibitionRepository.getRandomExhibitions();
    }

    getNewestExhibitions(page: number): Promise<Exhibition[]> {
        return this.exhibitionRepository.getNewestExhibitions(page);
    }

    getExhibitionsSortedByDeadline(page: number): Promise<Exhibition[]> {
        return this.exhibitionRepository.getExhibitionsSortedByDeadline(page);
    }

    getExhibitionsSortedByInterest(page: number): Promise<Exhibition[]> {
        return this.exhibitionRepository.getExhibitionsSortedByInterest(page);
    }

}
