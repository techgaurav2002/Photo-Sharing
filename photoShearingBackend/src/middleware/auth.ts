import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

//8955

export const authenticate = async (req:Request,res:Response,next:any)=>{
    try{
       
        // const token = req.body.token;
    //  const token = req.body;
    //   console.log(token);
      const token = req.headers.authorization;
      console.log("gaurav");
      
      console.log(token);
      
      
      const secretKey = "gaurav";
      
       
        
        
    // const token  = req.body.token;
    // const token ="ujjwa;";
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Token missing"
        })
    }

    try{
         jwt.verify(token, secretKey, (err:any, decoded:any) => {
            if (err) {
              // Token verification failed
              console.error('Token verification failed:', err);
            } else {
              // Token verification succeeded
              console.log('Decoded token:', decoded);
            }
          });
        
        
    }catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"invalid token"
        });
        
    }
    next();
    
    
}catch(error){
    console.log(error);
    
}
    


}