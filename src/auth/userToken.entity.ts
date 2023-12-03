import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    hash_refresh_token: string

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User

    @CreateDateColumn()
    created_at: Date
}