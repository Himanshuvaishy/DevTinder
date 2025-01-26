const validator=require("validator")

const validationSignUp=(req)=>{

    const {firstName,lastName,email,password}=req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    }

    else if(firstName.length <2 || firstName.length >50){
        throw new Error("charcter must be between in 4-50");
    }

    else if(!validator.isEmail(email)){
        throw new Error("email is not valid");
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error("password is not strong");

    }

}

const validateEditProfile=(req)=>{

    const allowedEditField = [    "firstName",
      "lastName",
      "emailId",
      "photoUrl",
      "gender",
      "age",
      "about",
      "skills",]
     // ! there are different way to write logic
    

     // ! first and most appropriate way
      const isEditAllowed =Object.keys(req.body).every((field)=>
    allowedEditField.includes(field)
    );

    // ! second 

    // let bodyfield=Object.keys(req.body);

    // for(const field of bodyfield){
    //     if(!allowedEditField.includes(field)){
    //                 return false;
    //     }

        
    // }
    // return true;

   // ! third way
//     const invalidFeilds=Object.keys(req.body).filter((field)=>{
//         !allowedEditField.includes(field);
//     })

//     if(invalidFeilds.length==0){
//   return true;
// }else {
//     return  false;
// }
  

    return isEditAllowed;

}


const validateProfileEditData = (req) => {
 // console.log('Request body for validation:', req.body);
  const { photoUrl, age, gender, about, skills } = req.body;

  // Example validation
 

  if (age && (!Number.isInteger(Number(age)) || Number(age) < 0)) {
   // console.log("Invalid age:", age);
    throw new Error("Age must be a positive integer.");
  }
  if (gender && !["male", "female", "other"].includes(gender)) {
    //console.log("Invalid gender:", gender);
    throw new Error("Gender must be 'male', 'female', or 'other'.");
  }
  if (about && !validator.isLength(about, { max: 500 })) {
    //console.log("Invalid about text:", about);
    throw new Error("About section must be less than 500 characters.");
  }
  if (skills && !Array.isArray(skills)) {
    //console.log("Invalid skills:", skills);
    throw new Error("Skills must be an array.");
  }
  if (skills && skills.length > 10) {
   // console.log("Too many skills:", skills);
    throw new Error("You can only add up to 10 skills.");
  }
};

module.exports={validationSignUp,validateEditProfile,validateProfileEditData};