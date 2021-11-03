import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/user.entity';
import * as qs from 'qs';
import axios from 'axios';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async signInWithKakao(code: string): Promise<{accessToken: string, refreshToken: string}> {
        const { data } = await axios({
            method: 'POST',
            url: process.env.KAKAO_ACCESS_TOKEN_URL,
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.KAKAO_CLIENT_ID,
                client_secret: process.env.KAKAO_SECRET,
                code,
            }
        })
        const { access_token } = data;

        const userInfo = await axios.get(process.env.KAKAO_USER_URL, {
            headers: { Authorization: `Bearer ${access_token}`}
        });
        const { kakao_account }: {[key: string]: any} = userInfo.data;

        const user = await this.userService.checkRegisteredUser(kakao_account.email, 'kakao');
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
