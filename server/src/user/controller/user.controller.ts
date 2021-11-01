import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Artwork } from '../../artwork/artwork.entity';

@Controller('/users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/:userId/artworks')
    getAllUsersArtworks(@Param('userId', ParseIntPipe) userId: number): Promise<Artwork[]> {
        return this.userService.getAllUsersArtworks(userId);
    }

}
