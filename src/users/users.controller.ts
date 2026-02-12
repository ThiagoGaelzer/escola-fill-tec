import {
    Body,
    Controller,
    Delete,
    Get,
    Param, ParseIntPipe, Patch,
    Post
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController{
    constructor(
        private readonly usersService: UsersService,
    ) {}

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

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDTO: UpdateUserDTO,
    ) {
        return this.usersService.update(id, updateUserDTO);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id:number,) {
        return this.usersService.remove(id);
    }
}