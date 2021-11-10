import {
    Controller,
    Get,
    Param,
    ParseIntPipe, Query,
    UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../user.entity';
import { Artwork } from '../../artwork/artwork.entity';
import { CustomAuthGuard } from '../../auth/guard/CustomAuthGuard';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    getAllUsersArtworksApiOperation,
    getAllUsersArtworksApiParam,
    getUserProfile,
    getUserProfileApiParam,
} from '../swagger';

@UseGuards(CustomAuthGuard)
@Controller('/users')
@ApiTags('유저 컨트롤러')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/:userId')
    @ApiOperation(getUserProfile)
    @ApiParam(getUserProfileApiParam)
    @ApiQuery({ name: 'strategy', type: String })
    @ApiResponse({ type: User })
    getUserProfile(
        @Param('userId') userId: string,
        @Query('strategy') loginStrategy: string
    ): Promise<User> {
        return this.userService.getUserProfile(userId, loginStrategy);
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

}
