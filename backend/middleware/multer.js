import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Set the destination folder for uploaded files (adjust as needed)
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    // Set the file name to the original name
    callback(null, file.originalname);
  }
});

const upload = multer({ storage });

export default upload;
