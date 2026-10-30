import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service.js";

@Controller('customer')
export class AuthController{
    constructor(private readonly authService:AuthService){}
    @Get('test')
    getHello():string{
        return this.authService.getString();
    }
}