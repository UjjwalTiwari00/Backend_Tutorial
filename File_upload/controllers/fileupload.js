const File=require("../models/File")

// localfile ke handler function likhna hai 

exports.localFileUpload=async(req,res)=>{
    try{
        //file fetch from request
        //ye .file jo req.files.file me hai na usse hi ham postman ke form data me key ki tarah use krenge
        const file=req.files.file;
        console.log(file);
        //create path to store file needs to be stored on server
        let path=__dirname +"/files/" +Date.now()+ `.${file.name.split('.')[1]}`;
        // add path to the move function
        file.mv(path,(err)=>{
            console.log(err);
            
        })
        // create a successful response
        res.json({
            success:true,
            message:'local file upload successfully',
        });
    }
    catch(error){
        console.log(error);
        
    }
}