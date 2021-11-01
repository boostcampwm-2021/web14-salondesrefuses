import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";


export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: '',
    port: 3306,
    username: '',
    password: '',
    database: '',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
};