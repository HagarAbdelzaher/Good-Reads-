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

function fileFilter (req, file, cb){
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    // console.log("true")
    return cb(null, true);
  } else {
    // console.log("fileFilter")
    return cb({ status: 422, message: "file not supported"});
  }
}

// upload photo
const upload = multer(
  { storage: storage, fileFilter }, { limits: { fileSize: 5000000 } }).single('image'); // limit file size to 5 MB)

const fileParser = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return next({status: err.status || 422, message: err.message || "Error Upload File" }); // must send error to next()
    }
    next();
  });
};



module.exports = {
  fileParser,
};