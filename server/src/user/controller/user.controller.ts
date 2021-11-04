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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    getAllUsersArtworksApiOperation,
    getAllUsersArtworksApiParam,
} from '../swagger';

@UseGuards(CustomAuthGuard)
@Controller('/users')
@ApiTags('유저 컨트롤러')
export class UserController {
    constructor(private userService: UserService) {}

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
