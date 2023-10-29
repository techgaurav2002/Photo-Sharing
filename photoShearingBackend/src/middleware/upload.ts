import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const extension = originalname.split('.').pop();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, originalname.split('.')[0] + '-' + uniqueSuffix + '.' + extension);
  },
});

const upload = multer({ storage });

export default upload;