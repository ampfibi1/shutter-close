import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/users.entity.js";
import { Repository } from "typeorm";
import { GetUserDto } from "./dto/users_dto/getuser.dto.js";
import { Category } from "../entities/categories.entity.js";
import { Product } from "../entities/products.entity.js";
import { Order } from "../entities/orders.entity.js";
import { CreateCategoryDto } from "./dto/users_dto/create-category.dto.js";

@Injectable()
export class AdminService{
    constructor(
        @InjectRepository(User) private readonly userRepo:Repository<User>,
        @InjectRepository(Category) private readonly categoryRepo:Repository<Category>,
        @InjectRepository(Product) private readonly productRepo:Repository<Product>,
        @InjectRepository(Order) private readonly orderRepo:Repository<Order>,
    ){}
    getString():string{
        return "hello test";
    }

    //----------------------------Dashboard-------------------------
    async getDashboard() {
      const [totalUsers,totalCategories,totalProducts,totalOrders,] = await Promise.all([
        this.userRepo.count(),
        this.categoryRepo.count(),
        this.productRepo.count(),
        this.orderRepo.count(),
      ]);

      return {totalUsers,totalCategories,totalProducts,totalOrders,};
    }

    //-----------------------------user details-----------------------
    async getUsers(): Promise<GetUserDto[]> {
        const users = await this.userRepo.find({order: { id: 'DESC' }  });
        return users.map(({ passwordHash, ...user }) => user);
    }

    async setUserActive(id: string, isActive: boolean) : Promise<Omit<User, 'passwordHash'>>{
        const user = await this.userRepo.findOneBy({ id });

        if (!user)  throw new NotFoundException('User not found');

        user.isActive = isActive;
        const savedUser = await this.userRepo.save(user);
        const { passwordHash, ...safeUser } = savedUser;

        return safeUser;
    }
    
    //--------------------------------category-------------------------
    async getCategories():Promise<Category[]> {
      return await this.categoryRepo.find({relations: { parent: true },order: { name: 'ASC' }});
    }

    createCategory(dto: CreateCategoryDto): Promise<Category> {
      return this.categoryRepo.save(this.categoryRepo.create(dto));
    }

    async updateCategory(id: string, dto: CreateCategoryDto) : Promise<Category>{
      const category = await this.categoryRepo.findOneBy({ id });

      if (!category) throw new NotFoundException('Category not found');

      this.categoryRepo.merge(category, dto);
      return this.categoryRepo.save(category);
    }

    async deleteCategory(id: string):Promise< {message: string }> {
      const category = await this.categoryRepo.findOneBy({ id });

      if (!category)   throw new NotFoundException('Category not found');
      
      await this.categoryRepo.remove(category);
      return { message: 'Category deleted successfully' };
    }

    //---------------------------------product----------------------
    
}