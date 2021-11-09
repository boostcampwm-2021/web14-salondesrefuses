import {
    Body,
    Controller,
    HttpCode,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArtworkDTO, NewArtworkDTO } from '../dto/artworkDTOs';
import { ArtworkService } from '../service/artwork.service';
import { CustomAuthGuard } from '../../auth/guard/CustomAuthGuard';
import {
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { createArtWorkApiOperation, createArtworkApiBody } from '../swagger';
import { User } from 'src/user/user.entity';

@Controller('artworks')
@ApiTags('작품 컨트롤러')
export class ArtworkController {
    constructor(private readonly artworkService: ArtworkService) {}

    @Post()
    @HttpCode(201)
    @UseGuards(CustomAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation(createArtWorkApiOperation)
    @ApiBody(createArtworkApiBody)
    @ApiResponse({ type: NewArtworkDTO })
    postArtWork(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: CreateArtworkDTO,
        @Req() req: Express.Request & { user: User },
    ): Promise<NewArtworkDTO> {
        return this.artworkService.createArtWork(file, body, req.user);
    }
}
