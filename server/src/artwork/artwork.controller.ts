import { Get, Post, Patch, Req, Param, Body, ParseIntPipe, ValidationPipe, UploadedFile, UsePipes, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomAuthGuard } from '@auth/guard/customAuthGuard';
import { CreateArtworkDTO, NewArtworkDTO, InterestRequestDTO } from './dto/artwork.dto';
import { InterestArtworkService } from '@interestArtwork/interestArtwork.service';
import { ArtworkService } from './artwork.service';
import { User } from '@user/user.entity';
import { Artwork } from './artwork.entity';
import { UpdateResult } from 'typeorm';
import {
    _ArtworkController,
    GetArtworkApi,
    PostArtworkApi,
    InterestArtworkApi,
    UpdateNFTTokenApi,
} from './decorator';

@_ArtworkController()
export class ArtworkController {
    constructor(
        private readonly artworkService: ArtworkService,
        private readonly interestArtworkService: InterestArtworkService,
    ) {}

    @Get('/:artworkId')
    @GetArtworkApi()
    getArtwork(@Param('artworkId', ParseIntPipe) artworkId: number): Promise<Artwork> {
        return this.artworkService.getArtwork(artworkId);
    }

    @Post()
    @UseGuards(CustomAuthGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('image'))
    @PostArtworkApi()
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
    @InterestArtworkApi()
    interestArtwork(
        @Body() interestRequestDTO: InterestRequestDTO,
        @Req() { user }: Express.Request & { user: User },
    ): Promise<boolean> {
        return this.interestArtworkService.createInterestArtwork(user, interestRequestDTO);
    }

    @Patch('/:artworkId/nft')
    @UseGuards(CustomAuthGuard)
    @UpdateNFTTokenApi()
    updateNFTToken(
        @Param('artworkId', ParseIntPipe) artworkId: number,
        @Body('nftToken') nftToken: string
    ): Promise<UpdateResult> {
        return this.artworkService.updateNFTToken(artworkId, nftToken);
    }
}
