const express=require('express')

const router=express.Router()

const{SignupPost}=require("../controllers/user");
const{login}=require("../controllers/user");

router.post('/signup',SignupPost)
router.post('/login',login)

module.exports=router;