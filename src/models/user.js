const mongoose=require("mongoose");
const validator=require("validator")
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
        type:String
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

// model

const User=mongoose.model("User",userSchema);

module.exports=User;