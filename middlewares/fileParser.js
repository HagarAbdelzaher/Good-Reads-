const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { cloudinary } = require("../config/cloudPhoto");
const fs = require('fs');



const createUrlPhoto = async(photoUrl) => {
  let image = await cloudinary.uploader.upload(photoUrl, {
    resource_type: "image" 
  }).then((result)=>{
      fs.unlinkSync(photoUrl);
      return result.url;
    }).catch(err =>  console.log(err));
    return image
};

const deleteUrlPhoto = async(photoUrl) => {
  cloudinary.uploader.destroy(photoUrl, { resource_type: "image" }).then(
    result=>console.log(result)
  );
}

const storage = multer.diskStorage({
  destination: 'public/photos/',
  filename(req, file, cb) {
    fileUUID = uuidv4();
    cb(null, `${file.originalname}-${fileUUID}`);
  },
});

function fileFilter (req, file, cb){
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
    return cb(null, true);
  } else {
    return cb({ status: 422, message: "file not supported"});
  }
}

// upload photo
const upload = multer(
  { storage: storage, fileFilter }, { limits: { fileSize: 5000000 } }).single('image');

const fileParser = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return next({status: err.status || 422, message: err.message || "Error Upload File" });
    }
    next();
  });
};



module.exports = {
  fileParser,
  createUrlPhoto,
  deleteUrlPhoto
};