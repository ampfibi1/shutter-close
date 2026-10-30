import {Injectable,InternalServerErrorException,} from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  generateUploadSignature() {
    const { cloud_name, api_key, api_secret } = cloudinary.config();

    if (!cloud_name || !api_key || !api_secret) {
      throw new InternalServerErrorException('Cloudinary is not configured',);
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const paramsToSign = {
      timestamp,
      folder: 'shutter-close/products',
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      api_secret,
    );

    return {
      timestamp,
      signature,
      folder: paramsToSign.folder,
      cloudName: cloud_name,
      apiKey: api_key,
    };
  }

  async deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
}
}