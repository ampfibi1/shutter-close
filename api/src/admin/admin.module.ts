import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller.js";
import { AdminService } from "./admin.service.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address, AdminAuditLog, Category, CoinReward, CoinTransaction, DiscountRule, Order, OrderItem, Payment, Product, ProductPaymentOption, ShopSetting, User } from "../entities/index.js";
import { ProductImage } from "../entities/product_images.entity.js";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            User, Address, Category, Product, 
          ProductPaymentOption, DiscountRule,
          Order, OrderItem, Payment, CoinTransaction,ProductImage, 
          CoinReward, ShopSetting, AdminAuditLog
        ])
    ],
    controllers:[AdminController],
    providers:[AdminService]
}
)
export class AdminModule{}