import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ArtworkRepository } from '../artwork/artwork.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([ UserRepository, ArtworkRepository ]),
    ],
    controllers: [ UserController ],
    providers: [ UserService ],
})
export class UserModule {}
