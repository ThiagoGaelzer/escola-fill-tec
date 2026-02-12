import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({unique: true})
    email: string;

    @Column()
    senha: string;
}