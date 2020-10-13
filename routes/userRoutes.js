const authController = require("./../controllers/authController");
const imageController = require("./../controllers/imageController");
const express = require("express");
const router = express.Router();

router.post("/login", authController.login);

router.use(authController.protect);
router.patch("/images",imageController.uploadUserPhoto,imageController.generateThumnail,imageController.imageUpload);
router.get('/',imageController.getUser)

module.exports = router;