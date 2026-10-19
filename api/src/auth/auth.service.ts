import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService{
    getString():string{
        return "hello test";
    }
}