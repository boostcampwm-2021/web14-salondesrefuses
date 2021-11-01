import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExhibitionController } from './controller/exhibition.controller';
import { ExhibitionService } from './service/exhibition.service';
import { ExhibitionRepository } from "./exhibition.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([ ExhibitionRepository ]),
    ],
    controllers: [ ExhibitionController ],
    providers: [ ExhibitionService ],
})
export class ExhibitionModule {}
