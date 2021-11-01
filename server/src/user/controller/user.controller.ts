import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('/users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/:userId/artworks')
    getAllUsersArtworks(@Param('userId', ParseIntPipe) userId: number) {
        return this.userService.getAllUsersArtworks(userId);
    }

}
