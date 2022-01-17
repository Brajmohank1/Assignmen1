const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

dotenv.config({path : './config.env'});
const User = require("../model/userSchema")




const authenticate = async (req , res , next) =>{
    try{

        console.log("inside authentication")
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token , process.env.SECRET_KEY);

        console.log("After verify token")
        
        console.log(verifyToken._id)

        const rootUser = await User.findOne({_id : verifyToken._id , "tokens.token" : token})

        if(!rootUser){throw new Error("user not found")}
        console.log(rootUser)
        req.token = token
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    }catch(err){
        res.status(401).send("Unauthorized user");
    }


}


module.exports = authenticate;