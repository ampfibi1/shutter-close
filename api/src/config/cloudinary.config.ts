
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const cloudinaryUrl = configService.get<string>('CLOUDINARY_URL',);

    if (!cloudinaryUrl) throw new Error('CLOUDINARY_URL is not configured');

    const parsedUrl = new URL(cloudinaryUrl);

    cloudinary.config({
      cloud_name: parsedUrl.hostname,
      api_key: decodeURIComponent(parsedUrl.username),
      api_secret: decodeURIComponent(parsedUrl.password),
      secure: true,
    });

    return cloudinary;
  },
};
