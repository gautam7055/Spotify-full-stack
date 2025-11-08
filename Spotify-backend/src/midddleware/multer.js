import multer from "multer"; // multer is a middleware for handling multipart/form-data, which is primarily used for uploading files
import fs from 'fs';
import path from 'path';

// ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, callback){
        // prefix with timestamp to avoid collisions
        const uniqueName = `${Date.now()}-${file.originalname}`;
        callback(null, uniqueName);
    }
});

// Export the multer instance so routes can call .single/.array/.fields as needed
const upload = multer({ storage });

export default upload; // multer instance