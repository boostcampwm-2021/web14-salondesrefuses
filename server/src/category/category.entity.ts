import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Exhibition } from '../exhibition/exhibition.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
