 const adminAuth=(req,res,next)=>{
    console.log("admin authentication is checking");
    
    let token="abcd";
  
    let isAuthorized= token == "abcd"
  
    if(!isAuthorized){
      res.status(401).send("Not authorized")
    }
    else {
      next();
    }
  
  }

  const UserAuth=(req,res,next)=>{
    console.log("user authentication is checking");
    
    let token="abcd";
  
    let isAuthorized= token == "abcd"
  
    if(!isAuthorized){
      res.status(401).send("Not authorized")
    }
    else {
      next();
    }
  
  }

  module.exports={adminAuth,UserAuth};