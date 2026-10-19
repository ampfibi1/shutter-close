import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminService{
    getString():string{
        return "hello test";
    }
}