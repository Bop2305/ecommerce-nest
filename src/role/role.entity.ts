import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    @Generated('uuid')
    id: string

    @Column()
    role_name: string

    @Column()
    role_description: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    modified_at: Date
}