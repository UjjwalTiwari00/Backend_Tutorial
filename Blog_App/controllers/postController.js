//import model
const Post=require("../models/postModel");
// logic
exports.createPost=async(req,res)=>{
    try{
        // fetch data from request ki body
        const {title,body}=req.body;

        // create post object
        const posts=new Post({
            title,
            body
        });

        // save post 
        await posts.save();

         // Send a success response
         res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: posts,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}

exports.getAllPost=async(req,res)=>{
    try{
        Post.find()
        .then((post)=>res.json(post))
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}