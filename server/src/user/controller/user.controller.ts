import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Artwork } from '../../artwork/artwork.entity';
import { CustomAuthGuard } from '../../auth/guard/CustomAuthGuard';

@UseGuards(CustomAuthGuard)
@Controller('/users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/:userId/artworks')
    getAllUsersArtworks(@Param('userId', ParseIntPipe) userId: number): Promise<Artwork[]> {
        return this.userService.getAllUsersArtworks(userId);
    }

}
