const express=require('express')
const app=express()

 app.use(express.json())

 const ConnectWithDb=require("./config/database");

 ConnectWithDb();

require('dotenv').config();
const PORT=process.env.PORT || 4000;

const register=require("./routes/user")

app.use('/api',register);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });