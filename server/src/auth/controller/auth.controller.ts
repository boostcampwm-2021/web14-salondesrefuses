import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Response } from 'express';

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signIn')
    async signIn(
        @Body('code') code: string,
        @Body('strategy') strategy: string,
        @Res() res: Response
    ): Promise<void> {
        try {
            let user = null;
            strategy === 'google' ?
                user = await this.authService.signInWithGoogle(code)
                : user = await this.authService.signInWithKakao(code);

            const { accessToken, refreshToken } = user;

            res.cookie('accessToken', accessToken);
            res.cookie('refreshToken', refreshToken);
            res.json(true);
        } catch(err) {
            res.json(false);
        }
    }

}
