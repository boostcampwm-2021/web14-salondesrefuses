import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    snsId: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({
        select: false,
        default: null,
    })
    refreshToken: string;

    @Column()
    loginStrategy: string;
}
