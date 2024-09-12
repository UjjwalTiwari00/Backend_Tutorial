const express=require('express')
const {localFileUpload}=require("../controllers/fileupload")

const router=express.Router();

router.post('/localfileupload',localFileUpload);

module.exports=router;
