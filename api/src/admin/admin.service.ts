import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateCategoryDto, CreateProductDto, } from "./dto/index.js";
import {Category, Order, Product, User } from "../entities/index.js";

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
    getProducts():Promise<Product[]> {
      return this.productRepo.find({relations: { category: true },order: { id: 'DESC' }});
    }

    createProduct(dto: CreateProductDto):Promise<Product> {
      return this.productRepo.save(this.productRepo.create(dto) );
    }

    async updateProduct(id: string, dto: CreateProductDto):Promise<Product>{
      const product = await this.productRepo.findOneBy({ id });

      if (!product)   throw new NotFoundException('Product not found');

      this.productRepo.merge(product, dto);
      return this.productRepo.save(product);
    }

    async deleteProduct(id: string):Promise<{message:string}> {
      const product = await this.productRepo.findOneBy({ id });

      if (!product) throw new NotFoundException('Product not found');

      await this.productRepo.remove(product);
      return { message: 'Product deleted successfully' };
    }
}