const express=require('express')
const app=express();

require("dotenv").config();
const PORT=process.env.PORT||4000;

// middleware
app.use(express.json());

const blog=require("./routes/blog")

// mounting blog
app.use("/api/v1",blog)

const ConnectWithDb=require("./config/database")
ConnectWithDb();

app.listen(PORT,()=>{
    console.log("app is running successfull",PORT);
})

app.get('/',(req,res)=>{
    res.send(`this is my first app`)
})