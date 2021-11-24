import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CustomAuthGuard } from './guard/CustomAuthGuard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([ UserRepository ]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
        }),
    ],
    controllers: [ AuthController ],
    providers: [ AuthService, CustomAuthGuard ],
})
export class AuthModule {}
