import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';

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

    @Column({ type: 'datetime' })
    startAt: Date;

    @Column({ type: 'datetime' })
    endAt: Date;

    @Column()
    thumbnailImage: string;

    @ManyToOne(type => User, user => user.exhibitionList)
    user: User;

    @OneToMany(type => Category, category => category.exhibition)
    categories: Category[];
}
