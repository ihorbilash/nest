import { Role } from "src/roles/roles.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    hash_password: string;

    @JoinTable()
    @ManyToOne(() => Role, {
        cascade: true,
    })
    role: Role
}