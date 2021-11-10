import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ArtworkRepository } from '../artwork/artwork.repository';
import { JwtModule } from '@nestjs/jwt';
import { ImageModule } from '../image/image.module';

@Module({
    imports: [
        ImageModule,
        TypeOrmModule.forFeature([ UserRepository, ArtworkRepository ]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
        }),
    ],
    controllers: [ UserController ],
    providers: [ UserService ],
    exports: [ UserService ],
})
export class UserModule {}
