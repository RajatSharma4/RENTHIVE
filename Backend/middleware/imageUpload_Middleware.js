import multer from "multer";
import fs from 'fs';
import path from 'path';
const folderPath = './public/profilePics';

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}


const storage=multer.diskStorage(
    {

// destination:'./public/profilePics',
destination:folderPath,

filename: (req, file, cb) => {
    const uniqueSuffix = Date.now(); 
    cb(null, `${file.originalname}_${uniqueSuffix}`);
  }
      }
)

export const imageUpload=multer({storage:storage}

).single("pic")//input type= file name="pic" pass same name here

// export { imageUpload}
//export default image_upload