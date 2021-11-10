import {
    Body,
    Controller, Get,
    HttpCode, Param, ParseIntPipe,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArtworkDTO, NewArtworkDTO, InterestRequestDTO } from '../dto/artworkDTOs';
import { ArtworkService } from '../service/artwork.service';
import { CustomAuthGuard } from '../../auth/guard/CustomAuthGuard';
import { User } from 'src/user/user.entity';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    createArtWorkApiOperation,
    createArtworkApiBody,
    interestApiOperation,
    getArtworkApiOperation,
} from '../swagger';
import { InterestArtwork } from 'src/interestArtwork/interestArtwork.entity';
import { InterestArtworkService } from 'src/interestArtwork/interestArtwork.service';
import { Artwork } from '../artwork.entity';

@Controller('artworks')
@ApiTags('작품 컨트롤러')
export class ArtworkController {
    constructor(
        private readonly artworkService: ArtworkService,
        private readonly interestArtworkService: InterestArtworkService,
    ) {}

    @Get('/:artworkId')
    @ApiOperation(getArtworkApiOperation)
    @ApiParam({ name: 'artworkId', type: Number })
    @ApiResponse({ type: Artwork })
    getArtwork(@Param('artworkId', ParseIntPipe) artworkId: number): Promise<Artwork> {
        return this.artworkService.getArtwork(artworkId);
    }

    @Post()
    @HttpCode(201)
    @UseGuards(CustomAuthGuard)
    @UsePipes(ValidationPipe)
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

    @Post('/interest')
    @UseGuards(CustomAuthGuard)
    @UsePipes(ValidationPipe)
    @ApiOperation(interestApiOperation)
    @ApiBody({ type: InterestArtwork })
    @ApiResponse({ type: Boolean })
    interest(
        @Body() interestRequestDTO: InterestRequestDTO,
        @Req() req: Express.Request & { user: User }
    ): Promise<boolean> {
        return this.interestArtworkService.insertInterestArtwork(req.user, interestRequestDTO);
    }
}
