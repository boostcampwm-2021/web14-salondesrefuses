import {
    Body,
    Controller,
    HttpCode,
    Post,
    UploadedFile, UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArtworkDTO } from '../dto/artworkDTOs';
import { ArtworkService } from '../service/artwork.service';
import { Artwork } from '../artwork.entity';
import { CustomAuthGuard } from '../../auth/guard/CustomAuthGuard';

@Controller('artworks')
export class ArtworkController {
    constructor(private readonly artworkService: ArtworkService) {}

    @Post()
    @HttpCode(201)
    @UseGuards(CustomAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    postArtWork(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: CreateArtworkDTO
    ): Promise<Artwork> {
        return this.artworkService.createArtWork(file, body);
    }

}
