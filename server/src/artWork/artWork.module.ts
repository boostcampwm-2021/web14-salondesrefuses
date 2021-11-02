import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtworkRepository } from "./artwork.repository";
import { ArtworkController } from "./controller/artwork.controller";
import { ArtworkService } from "./service/artwork.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ ArtworkRepository ]),
    ],
    controllers: [ ArtworkController ],
    providers: [ ArtworkService ],
})
export class ArtworkModule {}
