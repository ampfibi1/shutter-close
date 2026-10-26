import {Body,Controller,Delete,Get,Param,ParseUUIDPipe,Patch,Post,UploadedFiles,UseInterceptors,UsePipes,ValidationPipe,BadRequestException,} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service.js';
import { CategoryDto, ProductDto } from './dto/index.js';

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

  @Post('products')
  @UseInterceptors(
    FilesInterceptor('photos', 5, {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB per photo
      },
      fileFilter: (_req, file, callback) => {
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'image/webp',
        ];

        if (!allowedTypes.includes(file.mimetype)) {
          return callback(
            new BadRequestException('Only JPEG, PNG, and WebP images are allowed',),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  createProduct(@Body() dto: ProductDto,@UploadedFiles() photos: Express.Multer.File[]) {
    return this.adminService.createProduct(dto,photos ?? [],);
  }

  @Patch('products/:id')
  @UseInterceptors(
    FilesInterceptor('photos', 5, {
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter: (_req, file, callback) => {
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'image/webp',
        ];

        if (!allowedTypes.includes(file.mimetype)) {
          return callback(
            new BadRequestException(
              'Only JPEG, PNG, and WebP images are allowed',
            ),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  updateProduct(@Param('id', ParseUUIDPipe) id: string,@Body() dto: ProductDto,@UploadedFiles() photos: Express.Multer.File[]) {
    return this.adminService.updateProduct(id,dto,photos ?? [],);
  }

  @Delete('products/:id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminService.deleteProduct(id);
  }
}