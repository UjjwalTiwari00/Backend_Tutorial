const express=require('express')

const router=express.Router();

// import controller
const{createComment}=require("../controllers/CommentController")
const{createPost}=require("../controllers/postController");
const{getAllPost}=require("../controllers/postController")

// mapping create krna ahi 

router.post("/comments/create",createComment)
router.post("/post/create",createPost)
router.get('/post',getAllPost);


// export krna hai
module.exports=router;