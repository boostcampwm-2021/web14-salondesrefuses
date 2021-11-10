import {
    Body,
    Controller,
    Get, Put,
    Req, UploadedFile,
    UseGuards, UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../user.entity';
import { Artwork } from '../../artwork/artwork.entity';
import { Exhibition } from '../../exhibition/exhibition.entity';
import { CustomAuthGuard } from '../../auth/guard/CustomAuthGuard';
import { RequestUserDTO } from '../dto/userDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import {
    getAllUsersArtworksApiOperation,
    updateUserProfileApiOperation,
    getUserProfile,
    getInterestArtworksApiOperation,
    getBiddingArtworksApiOperation,
    getBiddedArtworksApiOperation,
    getUsersExhibitionsApiOperation,
} from '../swagger';

@UseGuards(CustomAuthGuard)
@Controller('/users')
@ApiTags('유저 컨트롤러')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/')
    @ApiOperation(getUserProfile)
    @ApiResponse({ type: User })
    getUserProfile(
        @Req() req: Express.Request & { user: User }
    ): Promise<User> {
        return this.userService.getUserProfile(req.user);
    }

    @Put('/')
    @UseInterceptors(FileInterceptor('image'))
    @ApiOperation(updateUserProfileApiOperation)
    @ApiResponse({ type: UpdateResult })
    updateUserProfile(
        @Req() req: Express.Request & { user: User },
        @UploadedFile() file: Express.Multer.File,
        @Body() requestUserDTO: RequestUserDTO
    ): Promise<UpdateResult> {
        return this.userService.updateUserProfile(req.user, file, requestUserDTO);
    }

    @Get('/artworks')
    @ApiOperation(getAllUsersArtworksApiOperation)
    @ApiResponse({ type: Artwork })
    getAllUsersArtworks(
        @Req() req: Express.Request & { user: User }
    ): Promise<Artwork[]> {
        return this.userService.getAllUsersArtworks(req.user);
    }

    @Get('/artworks/interest')
    @ApiOperation(getInterestArtworksApiOperation)
    @ApiResponse({ type: Artwork })
    getInterestArtworks(
        @Req() req: Express.Request & { user: User }
    ): Promise<Artwork[]> {
        return this.userService.getInterestArtworks(req.user);
    }

    @Get('/artworks/transaction')
    @ApiOperation(getBiddingArtworksApiOperation)
    @ApiResponse({ type: Artwork })
    getBiddingArtworks(
        @Req() req: Express.Request & { user: User }
    ): Promise<Artwork[]> {
        return this.userService.getBiddingArtworks(req.user);
    }

    @Get('/artworks/bid')
    @ApiOperation(getBiddedArtworksApiOperation)
    @ApiResponse({ type: Artwork })
    getBiddedArtworks(
        @Req() req: Express.Request & { user: User }
    ): Promise<Artwork[]> {
        return this.userService.getBiddedArtworks(req.user);
    }

    @Get('/exhibitions')
    @ApiOperation(getUsersExhibitionsApiOperation)
    @ApiResponse({ type: Exhibition })
    getUsersExhibitions(
        @Req() req: Express.Request & { user: User }
    ): Promise<Exhibition[]> {
        return this.userService.getUsersExhibitions(req.user);
    }

}
