import { Permission } from "src/permission/permission.entity";
import { Role } from "src/role/role.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RolePermission {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Role, role => role.id)
    @JoinColumn({name: 'role_id'})
    role_id: string

    @ManyToOne(() => Permission, permission => permission.id)
    @JoinColumn({name: 'permission_id'})
    permission_id: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    modified_at: Date
}