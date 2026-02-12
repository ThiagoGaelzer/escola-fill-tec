import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UpdateAlternativeDTO } from "./update-alternative.dto";


export class UpdateQuestionDTO {

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  materia?: string;

  @IsOptional()
  @IsNumber()
  id_usuario?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAlternativeDTO)
  alternativas?: UpdateAlternativeDTO[];
}