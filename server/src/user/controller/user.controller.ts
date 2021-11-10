import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe, Put, Query, UploadedFile,
    UseGuards, UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../user.entity';
import { Artwork } from '../../artwork/artwork.entity';
import { CustomAuthGuard } from '../../auth/guard/CustomAuthGuard';
import { RequestUserDTO } from '../dto/userDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import {
    getAllUsersArtworksApiOperation,
    getAllUsersArtworksApiParam,
    updateUserProfileApiOperation,
    getUserProfile,
    userProfileApiParam,
    getInterestArtworksApiOperation,
} from '../swagger';

@UseGuards(CustomAuthGuard)
@Controller('/users')
@ApiTags('유저 컨트롤러')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/:userId')
    @ApiOperation(getUserProfile)
    @ApiParam(userProfileApiParam)
    @ApiQuery({ name: 'strategy', type: String })
    @ApiResponse({ type: User })
    getUserProfile(
        @Param('userId') userId: string,
        @Query('strategy') loginStrategy: string
    ): Promise<User> {
        return this.userService.getUserProfile(userId, loginStrategy);
    }

    @Put('/:userId')
    @UseInterceptors(FileInterceptor('image'))
    @ApiOperation(updateUserProfileApiOperation)
    @ApiParam(userProfileApiParam)
    @ApiQuery({ name: 'strategy', type: String })
    @ApiResponse({ type: UpdateResult })
    updateUserProfile(
        @Param('userId') userId: string,
        @Query('strategy') loginStrategy: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() requestUserDTO: RequestUserDTO
    ): Promise<UpdateResult> {
        return this.userService.updateUserProfile(userId, loginStrategy, file, requestUserDTO);
    }

    @Get('/:userId/artworks')
    @ApiOperation(getAllUsersArtworksApiOperation)
    @ApiParam(getAllUsersArtworksApiParam)
    @ApiResponse({ type: Artwork })
    getAllUsersArtworks(
        @Param('userId', ParseIntPipe) userId: number,
    ): Promise<Artwork[]> {
        return this.userService.getAllUsersArtworks(userId);
    }

    @Get('/:userId/artworks/interest')
    @ApiOperation(getInterestArtworksApiOperation)
    @ApiParam(userProfileApiParam)
    @ApiQuery({ name: 'strategy', type: String })
    @ApiResponse({ type: Artwork })
    getInterestArtworks(
        @Param('userId') userId: string,
        @Query('strategy') loginStrategy: string
    ): Promise<Artwork[]> {
        return this.userService.getInterestArtworks(userId, loginStrategy);
    }

}
