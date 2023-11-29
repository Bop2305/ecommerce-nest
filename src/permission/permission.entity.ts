import { RolePermission } from "src/rolepermission/rolepermission.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    permission_name: string

    @Column({ nullable: true })
    permission_description: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    modified_at: Date
}