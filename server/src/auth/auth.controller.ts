import { Post, Res, Body, UsePipes, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { _AuthController, SignInApi, SignOutApi } from './decorator';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthDto } from './dto/auth.dto';

@_AuthController()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signIn')
    @UsePipes(ValidationPipe)
    @SignInApi()
    async signIn(
        @Body() authCredentialDto: AuthDto,
        @Res() res: Response,
    ): Promise<void> {
        const { code, strategy } = authCredentialDto;
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
    @SignOutApi()
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
