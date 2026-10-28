import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CategoryDto, ProductDto, ProductImageDto, } from "./dto/index.js";
import {Category, Product, ProductImage} from "../entities/index.js";
import { CloudinaryService } from "../common/services/cloudinary.services.js";

@Injectable()
export class AdminService{
  constructor(
      @InjectRepository(Category) private readonly categoryRepo:Repository<Category>,
      @InjectRepository(Product) private readonly productRepo:Repository<Product>,
      @InjectRepository(ProductImage) private readonly productImageRepo:Repository<ProductImage>,
      private readonly cloudinaryService:CloudinaryService
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

  async createProduct(dto: ProductDto,images: ProductImageDto[] = [],): Promise<Product> {
    const product = this.productRepo.create(dto);
    const savedProduct = await this.productRepo.save(product);

    if (images.length > 0) {
      const imageEntities = images.map((image) =>
        this.productImageRepo.create({
          imageUrl: image.imageUrl,
          publicId: image.publicId,
          isPrimary: image.isPrimary,
          sortOrder: image.sortOrder,
          product: savedProduct,
        }),
      );

      await this.productImageRepo.save(imageEntities);
    }

    return this.productRepo.findOneOrFail({
      where: { id: savedProduct.id },
      relations: { category: true, images: true },
    });
  }

  async updateProduct(id: string,dto: ProductDto,images?: ProductImageDto[],): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: { images: true },
    });

    if (!product) throw new NotFoundException("Product not found");

    this.productRepo.merge(product, dto);
    await this.productRepo.save(product);

    // If images are provided, append them to the existing images.
    if (images && images.length > 0) {
      const existingCount = product.images.length;

      const imageEntities = images.map((image, index) =>
        this.productImageRepo.create({
          imageUrl: image.imageUrl,
          publicId: image.publicId,
          isPrimary:
            existingCount === 0 && image.isPrimary,
          sortOrder: existingCount + index,
          product,
        }),
      );

      await this.productImageRepo.save(imageEntities);
    }

    return this.productRepo.findOneOrFail({
      where: { id },
      relations: { category: true, images: true },
    });
  }

  async deleteProduct(id: string): Promise<{ message: string }> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: { images: true },
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    // Collect Cloudinary public IDs before deleting database records.
    const publicIds = product.images
      .map((image) => image.publicId)
      .filter(
        (publicId): publicId is string => publicId !== null,
      );

    // Delete the product and its related image records.
    await this.productRepo.remove(product);

    // Delete the actual images from Cloudinary.
    // Failures here won't undo the database deletion.
    await Promise.allSettled(
      publicIds.map((publicId) =>
        this.cloudinaryService.deleteImage(publicId),
      ),
    );

    return { message: "Product deleted successfully" };
  }
}