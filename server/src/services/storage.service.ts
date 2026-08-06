import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOADS_DIR = path.join(__dirname, '../../uploads');

export class StorageService {
  static async uploadImage(file: Express.Multer.File): Promise<string> {
    const filename = `${uuidv4()}-${file.originalname}`;
    const filePath = path.join(UPLOADS_DIR, filename);

    await fs.writeFile(filePath, file.buffer);
    return filename;
  }

  static async getImageUrl(storageKey: string): Promise<string> {
    return `/uploads/${storageKey}`;
  }

  static async uploadBase64Image(base64Data: string, originalName: string): Promise<string> {
    const buffer = Buffer.from(base64Data.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const filename = `${uuidv4()}-${originalName}`;
    const filePath = path.join(UPLOADS_DIR, filename);

    await fs.writeFile(filePath, buffer);
    return filename;
  }
}
