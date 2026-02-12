import {
    Injectable,
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseUserDTO } from './dto/response-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDTO): Promise<ResponseUserDTO> {
        const { email, senha } = createUserDto;

        const isEmailExisting = await this.usersRepository.findOne({
            where: { email },
        });

        if (isEmailExisting) {
            throw new ConflictException('O e-mail já está em uso');
        }

        try {
            const hashPassword = await bcrypt.hash(senha, 10);

            const user = this.usersRepository.create({
                ...createUserDto,
                senha: hashPassword,
            });

            const savedUser = await this.usersRepository.save(user);

            return new ResponseUserDTO({
                id: savedUser.id,
                nome: savedUser.nome,
                email: savedUser.email,
            });
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('O e-mail já está em uso');
            }
            console.log('error: ' + error)
            throw new InternalServerErrorException(
                'Erro ao criar usuário',
            );
        }
    }

    async findAll(): Promise<ResponseUserDTO[]> {
        const users = await this.usersRepository.find();

        return users.map((user) => new ResponseUserDTO({
            id: user.id,
            nome: user.nome,
            email: user.email,
        }),);
    }

    async findOne(id: number): Promise<ResponseUserDTO> {
        const user = await this.usersRepository.findOne({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return new ResponseUserDTO({
            id: user.id,
            nome: user.nome,
            email: user.email,
        });
    }

    async update(
        id: number,
        updateUserDTO: UpdateUserDTO,
    ): Promise<ResponseUserDTO> {
        const user = await this.usersRepository.findOne({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException('Uusário não encontrado');
        }

        if (updateUserDTO.senha) {
            updateUserDTO.senha = await bcrypt.hash(
                updateUserDTO.senha,
                10,
            );
        }

        Object.assign(user, updateUserDTO);

        const updatedUser = await this.usersRepository.save(user);

        return new ResponseUserDTO({
            id: updatedUser.id,
            nome: updatedUser.nome,
            email: updatedUser.email,
        });
    }

    async remove(id: number) {
        const user = await this.usersRepository.findOne({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        await this.usersRepository.remove(user);

        return { message: 'Usuário excluído com sucesso' };
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { email },
        });
    }
} 
