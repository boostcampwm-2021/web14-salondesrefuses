import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { ArtworkRepository } from '../../artwork/artwork.repository';
import { ImageService } from '../../image/service/image.service';
import { Artwork } from '../../artwork/artwork.entity';
import { User } from '../user.entity';
import { UpdateResult } from 'typeorm';
import { RequestUserDTO } from '../dto/userDTO';
import { ExhibitionRepository } from '../../exhibition/exhibition.repository';
import { Exhibition } from '../../exhibition/exhibition.entity';

@Injectable()
export class UserService {
    constructor(
        private imageService: ImageService,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(ArtworkRepository)
        private artworkRepository: ArtworkRepository,
        @InjectRepository(ExhibitionRepository)
        private exhibitionRepository: ExhibitionRepository,
    ) {}

    async checkRegisteredUser(userId: string, name: string, avatar: string, loginStrategy: string): Promise<User> {
        let user = await this.userRepository.findOne({ userId, loginStrategy });

        if (!user) {
            user = await this.userRepository.createUser(userId, name, avatar, loginStrategy);
        }

        return user;
    }

    updateUserToken(id: number, refreshToken: string): Promise<UpdateResult> {
        return this.userRepository.update(id, { refreshToken });
    }

    getUserProfile({ id }: User): Promise<User> {
        return this.userRepository.findOne({ id });
    }

    async updateUserProfile(
        { id }: User,
        file: Express.Multer.File,
        requestUserDTO: RequestUserDTO,
    ): Promise<UpdateResult> {
        if(!file) {
            return this.userRepository.update(
                { id },
                { ...requestUserDTO }
            );
        }
        const image = await this.imageService.fileUpload(file);
        const avatar = image.Location;

        return this.userRepository.update({ id }, { ...requestUserDTO, avatar });
    }

    getUsersArtworks({ id }: User): Promise<Artwork[]> {
        return this.artworkRepository.getUsersArtworks(id);
    }

    getInterestArtworks({ id }: User): Promise<Artwork[]> {
        return this.artworkRepository.getInterestArtworks(id);
    }

    getBiddingArtworks({ id }: User): Promise<Artwork[]> {
        return this.artworkRepository.getBiddingArtworks(id);
    }

    getBiddedArtworks(nftTokens: string): Promise<Artwork[]> {
        return this.artworkRepository.getBiddedArtworks(JSON.parse(JSON.stringify(nftTokens)));
    }

    getUsersExhibitions(user: User): Promise<Exhibition[]> {
        return this.exhibitionRepository.getUsersExhibitions(user);
    }
}
