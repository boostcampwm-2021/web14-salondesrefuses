import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Artwork } from '../../artwork/artwork.entity';
import { CustomAuthGuard } from '../../auth/guard/CustomAuthGuard';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    getAllUsersArtworksApiOperation,
    getAllUsersArtworksApiQuery,
} from '../swagger';

@UseGuards(CustomAuthGuard)
@Controller('/users')
@ApiTags('유저 컨트롤러')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/:userId/artworks')
    @ApiOperation(getAllUsersArtworksApiOperation)
    @ApiQuery(getAllUsersArtworksApiQuery)
    @ApiResponse({ type: Artwork })
    getAllUsersArtworks(
        @Param('userId', ParseIntPipe) userId: number,
    ): Promise<Artwork[]> {
        return this.userService.getAllUsersArtworks(userId);
    }
}
