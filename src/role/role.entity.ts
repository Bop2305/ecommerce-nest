import { RolePermission } from "src/rolepermission/rolepermission.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    role_name: string

    @Column({ nullable: true })
    role_description: string

    @OneToMany(() => User, user => user.role_id)
    users: User[]

    @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
    role_permissions: RolePermission[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    modified_at: Date
}