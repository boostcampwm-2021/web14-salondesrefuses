import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Artwork } from '../../artwork/artwork.entity';
import { CustomAuthGuard } from '../../auth/guard/CustomAuthGuard';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getAllUsersArtworksApiOperation, getAllUsersArtworksApiParam } from '../swagger';
import { User } from '../user.entity';

@UseGuards(CustomAuthGuard)
@Controller('/users')
@ApiTags('유저 컨트롤러')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/artworks')
    @UseGuards(CustomAuthGuard)
    @ApiOperation(getAllUsersArtworksApiOperation)
    @ApiParam(getAllUsersArtworksApiParam)
    @ApiResponse({ type: Artwork })
    getAllUsersArtworks(@Req() { user }: Request & { user: User }): Promise<Artwork[]> {
        return this.userService.getAllUsersArtworks(user.id);
    }
}
