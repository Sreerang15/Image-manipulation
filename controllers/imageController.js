
const multer = require("multer");
const User = require("../models/userModel");
const sharp = require('sharp');


 const multerStorage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, 'public/img/users');
   },
   filename: (req, file, cb) => {
     const ext = file.mimetype.split('/')[1];
     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
   }
 });

 const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.generateThumnail = async (req,res) => {

  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  
await sharp(req.file.buffer)
.resize(200, 200).
toFile(`public/img/users/thumnail-${req.file.filename}`)
}


exports.imageUpload = async (req, res) => {
try {
   
    req.body.photo = req.file.filename;
    
    const NewImage = await User.findByIdAndUpdate(req.user.id,{photo : req.body}, {
    new: true,
    runValidators: true
  });

 res.status(200).json({
    status: 'success',
    data: {
      user: NewImage
    }
  });
}catch (err) {
    console.log(err);
  }

}

exports.getUser = async (req,res) => {

  try {
    
    const user_id = req.user.id;
 
    const user = await User.findById(user_id);
    const source = req.query.source;

    if(source == 2){
      user = user.photo
    }else if(user == 1){
      user = user.thumbnail
    }


    res.status(200).json({
    status: 'success',
    data: {
      user: user
    }
  });
 
} catch (error) {
  console.log(error);    
  }


}