// app creation 
const express=require('express')
const app=express();
// port find krna ahih 
require("dotenv").config();
const PORT=process.env.PORT||4000;
// middlewares add krna hai
app.use(express.json())
const fileUpload=require("express-fileupload");
app.use(fileUpload());
// db se connect krna hai
const ConnectWithDb=require('./config/database')
ConnectWithDb();
// cloud se connect krna ahi 
const cloudinaryConnect=require("./config/cloudinary");
cloudinaryConnect.cloudinaryConnect();
// api route mount krna hai
const upload=require("./routes/FileUpload");
app.use('/api',upload);

app.listen(PORT,()=>{
    console.log("app is running",PORT);
    
})


