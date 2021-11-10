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

    getUserProfile(user: User): Promise<User> {
        const { id } = user;
        return this.userRepository.findOne({ id });
    }

    async updateUserProfile(
        user: User,
        file: Express.Multer.File,
        requestUserDTO: RequestUserDTO
    ): Promise<UpdateResult> {
        const { id } = user;
        const image = await this.imageService.fileUpload(file);
        const avatar = image.Location;

        return this.userRepository.update(
            { id },
            { ...requestUserDTO, avatar }
        );
    }

    getAllUsersArtworks(user: User): Promise<Artwork[]> {
        const { id } = user;
        return this.artworkRepository.getAllUsersArtworks(id);
    }

    getInterestArtworks(user: User): Promise<Artwork[]> {
        const { id } = user;
        return this.artworkRepository.getInterestArtworks(id);
    }

    getBiddingArtworks(user: User): Promise<Artwork[]> {
        const { id } = user;
        return this.artworkRepository.getBiddingArtworks(id);
    }

    getBiddedArtworks(user: User): Promise<Artwork[]> {
        const { id } = user;
        return this.artworkRepository.getBiddedArtworks(id);
    }

}
