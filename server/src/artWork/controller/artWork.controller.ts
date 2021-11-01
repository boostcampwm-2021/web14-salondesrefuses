import {
    Body,
    Controller,
    HttpCode,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArtworkService } from '../service/artwork.service';

@Controller('artworks')
export class ArtworkController {
    constructor(private readonly artworkService: ArtworkService) {}

    @Post()
    @HttpCode(201)
    @UseInterceptors(FileInterceptor('image'))
    async postArtWork(@UploadedFile() file, @Body() body) {
        this.artworkService.createArtWork(file, body);

        return 'success';
    }
}
