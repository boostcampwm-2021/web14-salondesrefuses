import {
    Body,
    Controller,
    HttpCode,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArtworkDTO } from '../dto/artworkDTOs';
import { ArtworkService } from '../service/artwork.service';
import { Artwork } from '../artwork.entity';

@Controller('artworks')
export class ArtworkController {
    constructor(private readonly artworkService: ArtworkService) {}

    @Post()
    @HttpCode(201)
    @UseInterceptors(FileInterceptor('image'))
    postArtWork(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: CreateArtworkDTO
    ): Promise<Artwork> {
        return this.artworkService.createArtWork(file, body);
    }

}
