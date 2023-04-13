const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// to store user photo
const storage = multer.diskStorage({
  destination: 'public/photos/',
  filename(req, file, cb) {
    fileUUID = uuidv4();
    cb(null, `${file.originalname}-${fileUUID}`);
    // }
  },
});

function fileFilter(req, file, cb){
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new Error('File type not supported'), false);
  }
}

// upload photo
const upload = multer(
  { storage: storage, fileFilter }, { limits: { fileSize: 5000000 } }).single('image'); // limit file size to 5 MB)

const fileParser = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      throw {status: 400, message: 'Error uploading file' };
    }
    next();
  });
};



module.exports = {
  fileParser,
};
