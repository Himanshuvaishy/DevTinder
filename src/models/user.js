const mongoose=require("mongoose");
const validator=require("validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength: 3, 
        maxlength: 15


    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("not a valid email"+ value)

        }
    },
   password:{
        type:String,
        required:true,
       
        validate(value){
            if(!validator.isStrongPassword(value))
                throw new Error("not a strong  password"+ value)

        }
    },
    age:{
        type:Number,
        min:18

    },
   gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("not a valid gender")
            }

        }
    },
    photoUrl:{
        type:String,
        default:"http://localhost:7777/public/images/myimage.jpg"
    },
    about:{
        type:String,
        default:" this is default description"
    },
    
    skills:{
        type:[String],
       

    }

},{
    timestamps:true
});

// method 

userSchema.methods.getJWT = async function (){
    const user=this;
    const token= await jwt.sign({ _id: user._id }, "DEV@TINDER",{expiresIn:"1d"});
    return token;
}

userSchema.methods.validatePassword= async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password

    const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}

// model

const User=mongoose.model("User",userSchema);

module.exports=User;