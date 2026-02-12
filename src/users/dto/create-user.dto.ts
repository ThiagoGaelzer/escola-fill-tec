import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    senha: string;
}