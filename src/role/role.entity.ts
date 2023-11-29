import { RolePermission } from "src/rolepermission/rolepermission.entity";
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    role_name: string

    @Column({ nullable: true })
    role_description: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    modified_at: Date
}