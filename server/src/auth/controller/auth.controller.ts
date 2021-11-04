import { Body, Controller, Post, Res } from '@nestjs/common';
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
            let user = null;
            strategy === 'google'
                ? (user = await this.authService.signInWithGoogle(code))
                : (user = await this.authService.signInWithKakao(code));

            const { accessToken, refreshToken } = user;

            res.cookie('accessToken', accessToken);
            res.cookie('refreshToken', refreshToken);
            res.json(true);
        } catch (err) {
            res.json(false);
        }
    }
}
