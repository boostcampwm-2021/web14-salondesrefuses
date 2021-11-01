import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "./config/typeorm.config";
import { ExhibitionModule } from "./exhibition/exhibition.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeORMConfig),
      ExhibitionModule,
  ],
})
export class AppModule {}
