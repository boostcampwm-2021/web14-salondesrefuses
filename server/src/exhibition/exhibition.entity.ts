import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Exhibition {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    collaborator: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    startAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    endAt: Date;

    @Column()
    thumbnailImage: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    contents: string;

    @Column()
    size: string;

    @Column()
    artistName: string;

    @Column({ nullable: true, default: `[]` })
    categories: string;

    @Column({ nullable: true })
    theme: string;

    @Column({ nullable: false, default: '[]' })
    artworkIds: string;
}
