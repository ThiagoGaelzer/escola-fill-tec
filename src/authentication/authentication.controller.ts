import { Controller } from "@nestjs/common";
import { AuthService } from "./authentication.service";
import { Body, Post} from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor (
        private authService: AuthService,
    ) {}

    @Post('login')
    async login (@Body() body: {email: string; senha: string}) {
        return this.authService.login(
            body.email,
            body.senha,
        );
    }
}