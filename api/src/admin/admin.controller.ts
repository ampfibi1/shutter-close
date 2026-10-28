import {Body,Controller,Delete,Get,Param,ParseUUIDPipe,Patch,Post,UploadedFiles,UseInterceptors,UsePipes,ValidationPipe,BadRequestException,} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service.js';
import { CategoryDto, ProductDto, ProductImageDto } from './dto/index.js';
import { CloudinaryService } from '../common/services/cloudinary.services.js';

@Controller('admin')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly cloudinaryService:CloudinaryService
  ) {}

  // -------------------- CATEGORY CRUD --------------------
  @Get('categories')
  getCategories() {
    return this.adminService.getCategories();
  }

  @Post('categories')
  createCategory(@Body() dto: CategoryDto) {
    return this.adminService.createCategory(dto);
  }

  @Patch('categories/:id')
  updateCategory(@Param('id', ParseUUIDPipe) id: string,@Body() dto: CategoryDto,) {
    return this.adminService.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  deleteCategory(@Param('id', ParseUUIDPipe) id: string,) {
    return this.adminService.deleteCategory(id);
  }

  // -------------------- PRODUCT CRUD --------------------
  @Get('products')
  getProducts() {
    return this.adminService.getProducts();
  }

  @Post("products")
  createProduct(@Body() body: ProductDto & { images?: ProductImageDto[] },) {
    const { images, ...dto } = body;

    return this.adminService.createProduct(dto as ProductDto,images ?? [],);
  }

  @Patch("products/:id")
  updateProduct(@Param("id", ParseUUIDPipe) id: string,
    @Body() body: ProductDto & { images?: ProductImageDto[] } ) 
  {
    const { images, ...dto } = body;

    return this.adminService.updateProduct(id,dto as ProductDto,images,);
  }

  @Delete("products/:id")
  deleteProduct(@Param("id", ParseUUIDPipe) id: string,) {
    return this.adminService.deleteProduct(id);
  }
  
  //-----------------------cloudinary/singature-----------------
  @Post('cloudinary/signature')
  getCloudinarySignature() {
    return this.cloudinaryService.generateUploadSignature();
  }
}