import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller.js";
import { AdminService } from "./admin.service.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminAuditLog, Category, CoinReward, DiscountRule, Order, Product, ShopSetting, User } from "../entities/index.js";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            User,Category,Product,
            Order,DiscountRule,CoinReward,
            ShopSetting,AdminAuditLog,
        ])
    ],
    controllers:[AdminController],
    providers:[AdminService]
}
)
export class AdminModule{}