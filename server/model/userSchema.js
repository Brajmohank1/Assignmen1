
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")



const userSchema = new mongoose.Schema({


    name :{
        type : String,
        required : true
    },
    surname :{
        type :String,
        reuired : true
    },
    ecode :{
        type : String , 
        required : true
    },

    password :{
        type : String,
        required : true
    } , 
     
    userType : {

        type : String,

        enums : ["ADMIN" , "EMPLOYEE"]
    },
    tokens :[
        {
            token : {
                type : String,
                required : true
            }

        }
    ]
 
})

userSchema.pre('save' , async function (next){
 

    if(this.isModified('password')){
        this.password =await  bcrypt.hash(this.password , 12)
    }
    next();
})

userSchema.methods.generateAuthToken = async function(){
    try{
        let token1 = jwt.sign({_id : this._id} , process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token : token1})

        await this.save();
        console.log(token1)
        return token1;
    }catch(err){
        console.log(err);
    }
}
const User = mongoose.model('user' , userSchema);


module.exports = User;


 