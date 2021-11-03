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
        private readonly userRepository: UserRepository
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const { accessToken, refreshToken } = request.cookies;

        const verifyAccessToken = await this.verifyToken(accessToken);
        if(verifyAccessToken) return true;

        const verifyRefreshToken = await this.verifyToken(refreshToken);
        if(!verifyRefreshToken) {
            throw new UnauthorizedException('Refresh token is not valid');
        }

        const { userId } = verifyRefreshToken;
        const newAccessToken = this.jwtService.sign({ userId }, { expiresIn: 60 * 60 });
        response.cookie('accessToken', newAccessToken, { maxAge: 1000 * 60 * 60 });

        return true;
    }

    async verifyToken(token: string): Promise<User> {
        try {
            const { userId } = this.jwtService.verify(token);
            return await this.userRepository.findOne({ userId });
        } catch(err) {
            return null;
        }
    }

}
