import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateAlternativeDTO {

  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  descricao: string;

  @IsBoolean()
  resposta_correta: boolean;
}
