const express = require('express');
const bcrypt = require("bcryptjs")
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')

const authenticate = require("../middleware/authenticate")

require('../db/conn')

const User = require("../model/userSchema");

router.get('/' , (req , res) =>{

    res.send("Home page")
})

router.use(cookieParser())
router.post('/register' ,  async (req , res) =>{
         

        const {name , surname ,ecode , password , userType} = req.body;
    console.log(req.body)
        if( !name || ! surname || !ecode  || !password || !userType){

            return res.status(420).send()
        }
        try{

         const  userExist = await    User.findOne({ecode : ecode})
        
            if(userExist){

                console.log("Already register")
                return res.status(421).send({Error : "User already Exist"})
            }

            const user = new User(req.body)

            const userRegister =     await user.save();

            if(userRegister)
           { console.log("register succesfull")
                res.status(201).send(user)

        }else
             res.status(500).send({Messgae : " Registratrion failed"})
        }catch(err) { console.log(" Error ")}

       
})



router.post("/login" , async (req , res) =>{

    const {ecode , password , userType}  = req.body;


    try{

        const user = await User.findOne({ecode : ecode})
        let token ;
        if(user){

            const isMatch = await bcrypt.compare(password , user.password)

             token = await user.generateAuthToken();

             res.cookie("jwtoken" , token , {
                 expires : new Date(Date.now() + 60480000),
                 httpOnly : true
             })
            if(isMatch && user.userType === userType)
              {  res.status(201).send(user)

                    console.log("Login Successfull")
              }
            else if(!isMatch){
                console.log("Wrong password")
                res.status(202).send("Wrong password")
            }else if(isMatch && user.userType != userType){
                console.log("Please select correct User Type")
                res.status(203).send("Please select correct user Type")
            }
        }else{
            console.log("Ecode Not found")
            res.status(204).send(`Ecode ${ecode} not found`)
        }


    }catch(err) { console.log("Error in  Login")}

})



router.get('/about',authenticate, (req , res) =>{

    console.log("Hello my About")
    res.status(200).send(req.rootUser)
})

router.get('/logout' , authenticate , async (req , res) =>{
    try{
    console.log("logout page");
    
   
    res.clearCookie('jwtoken' ,  { path: '/' });

      

    console.log("after logout")

    res.status(200).send()

    }
    catch(error){
        console.log(error)
        res.status(500)
    }
})

module.exports = router;