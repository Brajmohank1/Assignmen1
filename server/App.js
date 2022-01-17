const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const cookieParser = require('cookie-parser')

dotenv.config({path : './config.env'});
const app = express();
require('./db/conn')
app.use(express.json())
app.use(require('./router/auth'))

app.use(cookieParser)
 
 
 const User = require('./model/userSchema')
const PORT = process.env.PORT;
const middleware = (req , res , next) =>{
    console.log("Hello from MiddleWare");
    next()
}
 


app.listen(PORT , () =>{
    console.log(`server running at port number ${PORT}`);
})