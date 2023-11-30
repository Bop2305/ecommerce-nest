import { BeforeInsert, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hash } from "bcryptjs";
import { Role } from "src/role/role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @Index()
    first_name: string

    @Column()
    @Index()
    last_name: string

    @Column({ unique: true })
    @Index({unique: true})
    email: string

    @Column()
    password: string

    @Column({ enum: ['Male', 'Female', 'Other'] })
    gender: string

    @Column({ nullable: true })
    birthday: Date

    @Column({ nullable: true })
    telephone: string

    @ManyToOne(() => Role, role => role.id)
    @JoinColumn({ name: 'role_id' })
    role_id: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    modified_at: Date

    @BeforeInsert()
    public async hashPassword() {
        this.password = await hash(this.password, 10)
    }
}