import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pergunta } from './entities/question.entity';
import { Resposta } from './entities/alternative.entity';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pergunta, Resposta])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
