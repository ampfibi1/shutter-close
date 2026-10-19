import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerService{
    getString():string{
        return "hello test";
    }
}