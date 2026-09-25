import multer from "multer";
import fs from 'fs';
import path from 'path';

const folderPath = './public/idPic';

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `id_${base}_${Date.now()}${ext}`);
  }
});

export const idUpload = multer({ 
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 }
}).single("idProof");