import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    ParseIntPipe, Patch,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArtworkDTO, NewArtworkDTO, InterestRequestDTO } from './dto/artworkDTOs';
import { ArtworkService } from './artwork.service';
import { CustomAuthGuard } from '../auth/guard/CustomAuthGuard';
import { User } from 'src/user/user.entity';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    createArtWorkApiOperation,
    createArtworkApiBody,
    interestApiOperation,
    getArtworkApiOperation,
    updateNFTTokenApiOperation,
} from './swagger';
import { InterestArtwork } from 'src/interestArtwork/interestArtwork.entity';
import { InterestArtworkService } from 'src/interestArtwork/interestArtwork.service';
import { Artwork } from './artwork.entity';
import { UpdateResult } from 'typeorm';

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
        @Req() { user }: Express.Request & { user: User },
    ): Promise<NewArtworkDTO> {
        return this.artworkService.createArtWork(file, body, user);
    }

    @Post('/interest')
    @UseGuards(CustomAuthGuard)
    @UsePipes(ValidationPipe)
    @ApiOperation(interestApiOperation)
    @ApiBody({ type: InterestArtwork })
    @ApiResponse({ type: Boolean })
    interestArtwork(
        @Body() interestRequestDTO: InterestRequestDTO,
        @Req() { user }: Express.Request & { user: User },
    ): Promise<boolean> {
        return this.interestArtworkService.createInterestArtwork(user, interestRequestDTO);
    }

    @Patch('/:artworkId/nft')
    @UseGuards(CustomAuthGuard)
    @ApiOperation(updateNFTTokenApiOperation)
    @ApiParam({ name: 'artworkId', type: Number })
    @ApiBody({ type: String })
    @ApiResponse({ type: UpdateResult })
    updateNFTToken(
        @Param('artworkId', ParseIntPipe) artworkId: number,
        @Body('nftToken') nftToken: string
    ): Promise<UpdateResult> {
        return this.artworkService.updateNFTToken(artworkId, nftToken);
    }
}
