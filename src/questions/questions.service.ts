import {
    BadRequestException, Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pergunta } from './entities/question.entity';
import { Resposta } from './entities/alternative.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDTO } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Pergunta)
        private questionRepo: Repository<Pergunta>,

        @InjectRepository(Resposta)
        private altRepo: Repository<Resposta>,
    ) { }

    async create(dto: CreateQuestionDto): Promise<Pergunta> {

        if (!dto.alternativas || dto.alternativas.length !== 5) {
            throw new BadRequestException(
                'A pergunta deve possuir exatamente 5 alternativas'
            );
        }

        const isAlternativeCorrect = dto.alternativas.filter(a => a.resposta_correta);

        if (isAlternativeCorrect.length !== 1) {
            throw new BadRequestException(
                'Deve existir exatamente uma alternativa correta',
            );
        }

        const question = this.questionRepo.create({
            descricao: dto.descricao,
            materia: dto.materia,
            id_usuario: dto.id_usuario,
            alternativas: dto.alternativas,
        });

        return await this.questionRepo.save(question);
    }

    async findAll(): Promise<Pergunta[]> {
        return this.questionRepo.find({
            relations: ['alternativas'],
            order: { id: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Pergunta> {
        const question = await this.questionRepo.findOne({
            where: { id },
            relations: ['alternativas'],
        });

        if (!question) {
            throw new NotFoundException('Pergunta não encontrada');
        }

        return question;
    }

    async update(id: number, dto: UpdateQuestionDTO) {
        const question = await this.findOne(id);

        if (dto.alternativas != undefined) {

            if (dto.alternativas.length !== 5) {
                throw new BadRequestException(
                    'A pergunta deve possuir exatamente 5 alternativas'
                );
            }

            const correctQuestion = dto.alternativas.filter(a => a.resposta_correta);

            if (correctQuestion.length !== 1) {
                throw new BadRequestException('A pergunta deve ter exatamente uma alternativa correta');
            }

            question.alternativas = dto.alternativas as any;
        }

        const { alternativas, ...questionData } = dto;

        Object.assign(question, questionData);

        return await this.questionRepo.save(question);
    }

    async remove(id: number) {
        const question = await this.findOne(id);

        await this.questionRepo.remove(question);

        return { message: 'Pergunta excluída com sucesso' };
    }
}
