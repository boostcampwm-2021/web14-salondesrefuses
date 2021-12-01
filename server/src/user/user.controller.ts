import { Get, Put, Req, Body, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Artwork } from '../artwork/artwork.entity';
import { Exhibition } from '../exhibition/exhibition.entity';
import { RequestUserDTO } from './dto/user.dto';
import { UpdateResult } from 'typeorm';
import {
    _UserController,
    GetBiddedArtworksApi,
    GetBiddingArtworksApi,
    GetInterestArtworksApi,
    GetUserProfileApi,
    GetUsersArtworksApi,
    GetUsersExhibitionsApi,
    UpdateUserProfileApi,
} from './decorator';

@_UserController()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/')
    @GetUserProfileApi()
    getUserProfile(@Req() { user }: Express.Request & { user: User }): Promise<User> {
        return this.userService.getUserProfile(user);
    }

    @Put('/')
    @UseInterceptors(FileInterceptor('image'))
    @UpdateUserProfileApi()
    updateUserProfile(
        @Req() { user }: Express.Request & { user: User },
        @UploadedFile() file: Express.Multer.File,
        @Body() requestUserDTO: RequestUserDTO,
    ): Promise<UpdateResult> {
        return this.userService.updateUserProfile(user, file, requestUserDTO);
    }

    @Get('/artworks')
    @GetUsersArtworksApi()
    getUsersArtworks(@Req() { user }: Express.Request & { user: User }): Promise<Artwork[]> {
        return this.userService.getUsersArtworks(user);
    }

    @Get('/artworks/interest')
    @GetInterestArtworksApi()
    getInterestArtworks(@Req() { user }: Express.Request & { user: User }): Promise<Artwork[]> {
        return this.userService.getInterestArtworks(user);
    }

    @Get('/artworks/transaction')
    @GetBiddingArtworksApi()
    getBiddingArtworks(@Req() { user }: Express.Request & { user: User }): Promise<Artwork[]> {
        return this.userService.getBiddingArtworks(user);
    }

    @Get('/artworks/bid')
    @GetBiddedArtworksApi()
    getBiddedArtworks(@Query('nftTokens') nftTokens: string): Promise<Artwork[]> {
        return this.userService.getBiddedArtworks(nftTokens);
    }

    @Get('/exhibitions')
    @GetUsersExhibitionsApi()
    getUsersExhibitions(@Req() { user }: Express.Request & { user: User }): Promise<Exhibition[]> {
        return this.userService.getUsersExhibitions(user);
    }
}
