import { EntityRepository, Repository } from "typeorm";
import { Exhibition } from "./exhibition.entity";

@EntityRepository(Exhibition)
export class ExhibitionRepository extends Repository<Exhibition> {

    async getRandomExhibitions(): Promise<Exhibition[]> {
        return await this.createQueryBuilder()
            .orderBy('RAND()')
            .limit(5)
            .getMany();
    }
}
