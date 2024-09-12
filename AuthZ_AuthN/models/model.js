const mongoose=require('mongoose')

const RegisterSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        require:true,
    },
})

module.exports=mongoose.model("Register",RegisterSchema);