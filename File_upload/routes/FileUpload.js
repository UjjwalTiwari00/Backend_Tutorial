const express=require('express')
const {localFileUpload,imageUpload}=require("../controllers/fileupload")

const router=express.Router();

router.post('/localfileupload',localFileUpload);
router.post('/imageupload',imageUpload)

module.exports=router;
