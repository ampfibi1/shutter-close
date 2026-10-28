import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller.js";
import { AdminService } from "./admin.service.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address, AdminAuditLog, Category, CoinReward, CoinTransaction, DiscountRule, Order, OrderItem, Payment, Product, ProductImage, ProductPaymentOption, ShopSetting, User } from "../entities/index.js";
import { CloudinaryModule } from "../common/services/cloudinary.module.js";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            User, Address, Category, Product, 
          ProductPaymentOption, DiscountRule,
          Order, OrderItem, Payment, CoinTransaction,ProductImage, 
          CoinReward, ShopSetting, AdminAuditLog
        ]),
        CloudinaryModule
    ],
    controllers:[AdminController],
    providers:[AdminService]
}
)
export class AdminModule{}