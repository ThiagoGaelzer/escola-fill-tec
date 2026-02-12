import { IsBoolean, IsString } from 'class-validator';

export class CreateAlternativeDto {
  @IsString()
  descricao: string;

  @IsBoolean()
  resposta_correta: boolean;
}
