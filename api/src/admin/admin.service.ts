import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CategoryDto, ProductDto, } from "./dto/index.js";
import {Category, Product} from "../entities/index.js";
import type { Multer } from "multer";

@Injectable()
export class AdminService{
    constructor(
        @InjectRepository(Category) private readonly categoryRepo:Repository<Category>,
        @InjectRepository(Product) private readonly productRepo:Repository<Product>,
    ){}
    getString():string{
        return "hello test";
    }
    
    //--------------------------------category-------------------------
    async getCategories():Promise<Category[]> {
      return await this.categoryRepo.find({relations: { parent: true },order: { name: 'ASC' }});
    }

    createCategory(dto: CategoryDto): Promise<Category> {
      return this.categoryRepo.save(this.categoryRepo.create(dto));
    }

    async updateCategory(id: string, dto: CategoryDto) : Promise<Category>{
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

    createProduct(dto: ProductDto,photos?: Express.Multer.File[],):Promise<Product> {
      // Upload photos to your storage provider,
      // save the product, and save its image URLs.
      // Implement this logic before using the endpoint.
      return this.productRepo.save(this.productRepo.create(dto) );
    }

    async updateProduct(id: string, dto: ProductDto, photos?: Express.Multer.File[]):Promise<Product>{
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