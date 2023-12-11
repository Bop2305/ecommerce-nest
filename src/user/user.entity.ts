import { BeforeInsert, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hash } from "bcryptjs";
import { Role } from "src/role/role.entity";
import { PublicFile } from "src/files/publicFile.entity";

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
    @Index({ unique: true })
    email: string

    @Column({ nullable: true })
    password: string

    @Column({ enum: ['Male', 'Female', 'Other'], nullable: true })
    gender: string

    @Column({ nullable: true })
    birthday: Date

    @Column({ nullable: true })
    telephone: string

    @ManyToOne(() => Role, role => role.id)
    @JoinColumn({ name: 'role_id' })
    role_id: string

    @Column({ default: false })
    is_register_by_google: boolean

    @OneToOne(() => PublicFile,
        file => file.url, {
        nullable: true,
        cascade: true
    })
    @JoinColumn({ name: 'avatar' })
    avatar: PublicFile

    @Column({ nullable: true })
    google_avatar: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    modified_at: Date

    @BeforeInsert()
    public async hashPassword() {
        if (!this.password) return this.password = null

        this.password = await hash(this.password, 10)
    }
}