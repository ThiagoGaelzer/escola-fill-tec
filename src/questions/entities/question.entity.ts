import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Resposta } from './alternative.entity';

@Entity('perguntas')
export class Pergunta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column()
  materia: string;

  @Column()
  id_usuario: number;

  @OneToMany(() => Resposta, alt => alt.pergunta, {
    cascade: true,
    eager: true,
  })
  alternativas: Resposta[];
}
