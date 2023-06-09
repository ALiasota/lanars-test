import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: any, name: string): Promise<string> {
    try {
      const fileName = `${name}${uuid.v4()}.jpg`;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        `File didn't save`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(filename: string): Promise<string> {
    const filePath = path.resolve(__dirname, '..', 'static');
    fs.unlink(path.join(filePath, filename), (err) => {
      if (err) {
        console.error(`Error: ${err}`);
        throw new HttpException(
          `File didn't deleted`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });
    return filename;
  }
}
