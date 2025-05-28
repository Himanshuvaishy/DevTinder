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
        default:"data:image/png;base64,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"
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