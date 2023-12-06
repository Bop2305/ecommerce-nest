import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PublicFile {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    url: string

    @Column({unique: true})
    key: string
}