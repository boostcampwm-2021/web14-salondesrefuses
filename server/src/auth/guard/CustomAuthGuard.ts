import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../user/user.repository';
import { User } from '../../user/user.entity';

@Injectable()
export class CustomAuthGuard extends AuthGuard('jwt') {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const jwtOneHour = 60 * 60,
            cookieOneHour = 1000 * 60 * 60;

        const { accessToken, refreshToken } = request.cookies;

        const verifiedAccessToken = await this.verifyToken(accessToken);
        if (verifiedAccessToken) {
            request.user = verifiedAccessToken;
            return true;
        }

        const verifiedRefreshToken = await this.verifyToken(refreshToken);
        if (!verifiedRefreshToken) {
            throw new UnauthorizedException('Refresh token is not valid');
        }

        request.user = verifiedRefreshToken;
        const { userId, loginStrategy } = verifiedRefreshToken;
        const newAccessToken = this.jwtService.sign({ userId, loginStrategy }, { expiresIn: jwtOneHour });
        response.cookie('accessToken', newAccessToken, {
            maxAge: cookieOneHour,
        });

        return true;
    }

    async verifyToken(token: string): Promise<User> {
        try {
            const { userId, loginStrategy } = this.jwtService.verify(token);
            return await this.userRepository.findOne({ userId, loginStrategy });
        } catch (err) {
            return null;
        }
    }
}
