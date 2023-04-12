
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';


// allow only image
const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    callback(null, false); 
  }
  callback(null,true);
};
//change file name
const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0]
  const fileExtName = extname(file.originalname);
 
  callback(null, `${name}${fileExtName}`);
};


export const interceptorOptions: MulterOptions = {
 /* storage: diskStorage({
    destination: 'uploads/images',
     filename: editFileName,
  }),*/
  fileFilter: imageFileFilter
}





