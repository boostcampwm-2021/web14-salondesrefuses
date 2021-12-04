import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as sharp from 'sharp';
import { Logger } from '@nestjs/common';
import { ObjectStorageData } from './dto/Image.dto';

@Injectable()
export class ImageService {
    private readonly s3: AWS.S3;

    constructor() {
        const endpoint = new AWS.Endpoint(process.env.NCP_OBJECT_STORAGE_END_POINT);
        const region = process.env.NCP_REGION;

        this.s3 = new AWS.S3({
            endpoint,
            region,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }

    async fileUpload(image: Express.Multer.File): Promise<ObjectStorageData> {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            ACL: 'public-read',
            Key: `objects/${Date.now()}-${image.originalname.split('.')[0]}.webp`,
            Body: image.buffer,
        };
        const options = {
            partSize: 5 * 1024 * 1024,
        };

        return new Promise((resolve, reject) => {
            this.s3.upload(params, options, (err, data) => {
                if (err) {
                    Logger.error(err);
                    reject(err.message);
                } else if (data) {
                    resolve(data);
                }
            });
        });
    }

    async cropImage(originalImage: Express.Multer.File) {
        const sharpImage = sharp(originalImage.buffer);
        const { height } = await sharpImage.metadata();

        const newWidth = Math.floor((height * 2) / 3);
        return await sharpImage.resize({ width: newWidth, height: height }).toBuffer();
    }

    async convertWebp(originalImage: Express.Multer.File) {
        const sharpImage = sharp(originalImage.buffer);

        return await sharpImage.webp({ lossless: false }).toBuffer();
    }
}
