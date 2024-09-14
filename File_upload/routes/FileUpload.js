const express=require('express')
const {localFileUpload,imageUpload,VideoUpload}=require("../controllers/fileupload")

const router=express.Router();

router.post('/localfileupload',localFileUpload);
router.post('/imageupload',imageUpload)
router.post('/videoupload',VideoUpload)

module.exports=router;
