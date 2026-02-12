export class ResponseUserDTO {
    id: number;
    nome: string;
    email: string;

    constructor(partial: Partial<ResponseUserDTO>) {
        Object.assign(this, partial);
    }
}