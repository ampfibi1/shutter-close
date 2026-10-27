import { Controller, Get } from "@nestjs/common";
import { CustomerService } from "./customer.service.js";

@Controller('customer')
export class CustomerController{
    constructor(private readonly customerService:CustomerService){}
    @Get('test')
    getHello():string{
        return this.customerService.getString();
    }
}