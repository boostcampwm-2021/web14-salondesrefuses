import { Controller, Get } from "@nestjs/common";
import { ExhibitionService } from "../service/exhibition.service";
import { Exhibition } from "../exhibition.entity";

@Controller('/exhibitions')
export class ExhibitionController {
    constructor(private exhibitionService: ExhibitionService) {}

    @Get('/random')
    getRandomExhibitions(): Promise<Exhibition[]> {
        return this.exhibitionService.getRandomExhibitions();
    }

}
