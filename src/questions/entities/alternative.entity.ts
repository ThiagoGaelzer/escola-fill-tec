import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Pergunta } from './question.entity';

@Entity('respostas')
export class Resposta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column({ default: false })
  resposta_correta: boolean;

  @ManyToOne(() => Pergunta, pergunta => pergunta.alternativas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_pergunta'})
  pergunta: Pergunta;
}
