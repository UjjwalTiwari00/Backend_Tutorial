// import mongoose
const mongoose=require('mongoose');

// routes handler

const likeSchema=new mongoose.Schema({
    post:{
        // jab bih aur koi model ko refer kr rahe hai to aise likhte , id ko darsa raha ahi 
        type:mongoose.Schema.Types.ObjectId,
        // refernce to the post model
        ref:"Post" 
    },
    user:{
        type:String,
        require:true,
    }
});

// export
module.exports=mongoose.model("Like",likeSchema)