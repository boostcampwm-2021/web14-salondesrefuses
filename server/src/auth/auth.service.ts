import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UpdateResult } from 'typeorm';
import axios from 'axios';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async signInWithGoogle(code: string): Promise<{ accessToken: string; refreshToken: string }> {
        const { data } = await axios({
            method: 'POST',
            url: process.env.GOOGLE_ACCESS_TOKEN_URL,
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirectUri: process.env.GOOGLE_AUTH_REDIRECT_URL,
                code,
            },
        });
        const { access_token } = data;

        const userInfo = await axios.get(process.env.GOOGLE_USER_URL, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        const { email, name, picture } = userInfo.data;

        const user = await this.userService.checkRegisteredUser(email, name, picture, 'google');
        return this.generateToken(user, 'google');
    }

    async signInWithKakao(code: string): Promise<{ accessToken: string; refreshToken: string }> {
        const { data } = await axios({
            method: 'POST',
            url: process.env.KAKAO_ACCESS_TOKEN_URL,
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.KAKAO_CLIENT_ID,
                client_secret: process.env.KAKAO_CLIENT_SECRET,
                code,
            },
        });
        const { access_token } = data;

        const userInfo = await axios.get(process.env.KAKAO_USER_URL, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        const { email, profile } = userInfo.data.kakao_account;

        if (!email || !profile) {
            await axios.post(process.env.KAKAO_UNLINK_URL, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            throw new Error('failed kakao login'); // @TODO 에러처리
        } else {
            const user = await this.userService.checkRegisteredUser(
                email,
                profile.nickname,
                profile.profile_image_url,
                'kakao',
            );
            return this.generateToken(user, 'kakao');
        }
    }

    async generateToken(user: User, loginStrategy: string): Promise<{ accessToken: string; refreshToken: string }> {
        const payload = {
            userId: user.userId,
            loginStrategy,
        };
        const oneHour = 60 * 60,
            oneWeek = 60 * 60 * 24 * 7;
        const accessToken = this.jwtService.sign(payload, { expiresIn: oneHour });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: oneWeek });

        await this.userService.updateUserToken(user.id, refreshToken);
        return { accessToken, refreshToken };
    }

    signOut(userId: number): Promise<UpdateResult> {
        return this.userService.updateUserToken(userId, null);
    }
}
