import {
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAlternativeDto } from './create-alternative.dto';

export class CreateQuestionDto {
  @IsString()
  descricao: string;

  @IsString()
  materia: string;

  @IsNumber()
  id_usuario: number;

  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => CreateAlternativeDto)
  alternativas: CreateAlternativeDto[];
}
