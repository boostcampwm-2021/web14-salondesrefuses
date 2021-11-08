import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/user.entity';
import axios from 'axios';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async signInWithGoogle(code: string): Promise<{accessToken: string, refreshToken: string}> {
        const { data } = await axios({
            method: 'POST',
            url: process.env.GOOGLE_ACCESS_TOKEN_URL,
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirectUri: process.env.GOOGLE_AUTH_REDIRECT_URL,
                code,
            }
        });
        const { access_token } = data;

        const userInfo = await axios.get(process.env.GOOGLE_USER_URL, {
            headers: { Authorization: `Bearer ${access_token}`}
        });
        const { email, picture } = userInfo.data;

        const user = await this.userService.checkRegisteredUser(email, picture, 'google');
        return this.generateToken(user);
    }

    async signInWithKakao(code: string): Promise<{accessToken: string, refreshToken: string}> {
        const { data } = await axios({
            method: 'POST',
            url: process.env.KAKAO_ACCESS_TOKEN_URL,
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.KAKAO_CLIENT_ID,
                client_secret: process.env.KAKAO_CLIENT_SECRET,
                code,
            }
        })
        const { access_token } = data;

        const userInfo = await axios.get(process.env.KAKAO_USER_URL, {
            headers: { Authorization: `Bearer ${access_token}`}
        });
        const { email, profile } = userInfo.data.kakao_account;

        const user = await this.userService.checkRegisteredUser(email, profile.profile_image_url, 'kakao');
        return this.generateToken(user);
    }

    generateToken(user: User): {accessToken: string, refreshToken: string} {
        const payload = {
            userId: user.userId
        };
        const accessToken = this.jwtService.sign(payload, { expiresIn: 60 * 60 });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: 60 * 60 * 24 * 7 });

        this.userService.updateUserToken(user.id, refreshToken);
        return { accessToken, refreshToken };
    }

}
