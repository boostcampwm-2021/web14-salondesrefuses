import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/google')
    signInWithGoogle(@Body() code: string): Promise<{accessToken: string, refreshToken: string}> {
        return this.authService.signInWithGoogle(code);
    }

    @Post('/kakao')
    signInWithKakao(@Body() code: string): Promise<{accessToken: string, refreshToken: string}> {
        return this.authService.signInWithKakao(code);
    }

}
