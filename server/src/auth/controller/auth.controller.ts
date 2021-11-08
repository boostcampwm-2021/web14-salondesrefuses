import { Body, Controller, ParseIntPipe, Post, Res } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { signInApiBody, signInApiOperation } from '../swagger';

@Controller('/auth')
@ApiTags('인증 컨트롤러')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signIn')
    @ApiOperation(signInApiOperation)
    @ApiBody(signInApiBody)
    async signIn(
        @Body('code') code: string,
        @Body('strategy') strategy: string,
        @Res() res: Response,
    ): Promise<void> {
        try {
            let user;
            strategy === 'google'
                ? user = await this.authService.signInWithGoogle(code)
                : user = await this.authService.signInWithKakao(code);

            const { accessToken, refreshToken } = user;
            const oneHour = 1000 * 60 * 60, oneWeek = 1000 * 60 * 60 * 24 * 7;

            res.cookie('accessToken', accessToken, { maxAge: oneHour });
            res.cookie('refreshToken', refreshToken, { maxAge: oneWeek });
            res.json(true);
        } catch (err) {
            res.json(false);
        }
    }

    @Post('/signOut')
    async signOut(
        @Body('userId', ParseIntPipe) userId: number,
        @Res() res: Response
    ): Promise<void> {
        await this.authService.signOut(userId);

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.end();
    }

}
