import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.services.js';
import { CloudinaryProvider } from '../../config/cloudinary.config.js';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
