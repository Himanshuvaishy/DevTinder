const validator=require("validator")

const validationSignUp=(req)=>{

    const {firstName,lastName,email,password}=req.body;

    if(!firstName || !lastName){
        throw new Error("Name is vot valid")
    }

    else if(firstName.length <4 || firstName.length >50){
        throw new Error("charcter must be between in 4-50");
    }

    else if(!validator.isEmail(email)){
        throw new Error("email is not valid");
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error("password is not strong");

    }

}

module.exports={validationSignUp};