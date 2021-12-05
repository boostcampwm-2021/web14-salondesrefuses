import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompletedAuction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    artworkId: number;

    @Column()
    sellerId: number;

    @Column()
    startAt: Date;

    @Column()
    endAt: Date;

    @Column()
    bidderId: number;

    @Column()
    price: string;

    @Column()
    biddedAt: Date;
}
