import {
    Body,
    Controller,
    Delete,
    Get,
    Param, ParseIntPipe, Patch,
    Post,
    UseGuards
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/authentication/guards/jwt-auth.guard";

@Controller('users')
export class UsersController{
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createUserDTO: CreateUserDTO) {
        return this.usersService.create(createUserDTO);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDTO: UpdateUserDTO,
    ) {
        return this.usersService.update(id, updateUserDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id:number,) {
        return this.usersService.remove(id);
    }
}