import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FILE_PATH } from '../../utils';

export function imageUploadInterceptor() {
  return FileInterceptor('file', {
    storage: diskStorage({
      destination: FILE_PATH,
      filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
      },
    }),
  });
}
