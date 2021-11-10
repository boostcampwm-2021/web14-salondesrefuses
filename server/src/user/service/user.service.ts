import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { ArtworkRepository } from '../../artwork/artwork.repository';
import { ImageService } from '../../image/service/image.service';
import { Artwork } from '../../artwork/artwork.entity';
import { User } from '../user.entity';
import { UpdateResult } from 'typeorm';
import { RequestUserDTO } from '../dto/userDTO';

@Injectable()
export class UserService {
    constructor(
        private imageService: ImageService,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(ArtworkRepository)
        private artworkRepository: ArtworkRepository
    ) {}

    async checkRegisteredUser(userId: string, name:string, avatar: string, loginStrategy: string): Promise<User> {
        let user = await this.userRepository.findOne({ userId, loginStrategy });

        if(!user) {
            user = await this.userRepository.createUser(userId, name, avatar, loginStrategy);
        }

        return user;
    }

    updateUserToken(id: number, refreshToken: string): Promise<UpdateResult> {
        return this.userRepository.update(id, { refreshToken });
    }

    getUserProfile(userId: string, loginStrategy: string): Promise<User> {
        return this.userRepository.findOne({ userId, loginStrategy });
    }

    async updateUserProfile(
        userId: string,
        loginStrategy: string,
        file: Express.Multer.File,
        requestUserDTO: RequestUserDTO
    ): Promise<UpdateResult> {
        const image = await this.imageService.fileUpload(file);
        const avatar = image.Location;

        return this.userRepository.update(
            { userId, loginStrategy },
            { ...requestUserDTO, avatar }
        );
    }

    getAllUsersArtworks(userId: number): Promise<Artwork[]> {
        return this.artworkRepository.getAllUsersArtworks(userId);
    }

    getInterestArtworks(userId: string, loginStrategy: string): Promise<Artwork[]> {
        return this.artworkRepository.getInterestArtworks(userId, loginStrategy);
    }

    getBiddingArtworks(userId: string, loginStrategy: string): Promise<Artwork[]> {
        return this.artworkRepository.getBiddingArtworks(userId, loginStrategy);
    }

}
