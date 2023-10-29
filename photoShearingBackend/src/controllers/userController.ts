import { Request, Response } from 'express';
import User from "../models/user";
import bcrypt from "bcrypt";
import { Op } from 'sequelize';


export const getAllUser =async (req:Request,res:Response) => {
    try{
        const data = await User.findAll({});
        return res.status(200).json({data:data});

    }catch(error){
        return res.status(500).json({ error: 'An error occurred while getting all users.' });
    }
    
}

export const getUserById = async (req:Request,res:Response) =>{
    try{
        const data = await User.findOne({
            where:{
                id : req.params.id
            }
        })
        return res.status(200).json({data:data});
    }catch(error){
        return res.status(500).json({ error: 'An error occurred while getting user by Id.' });
    }
}

export const createUser = async (req:Request,res:Response) =>{
   
   


    try {

        const { firstName, lastName, email, phone, password, address, } = req.body;
    
        if (!password) {
            return res.status(400).json({ error: 'Password is required.' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const existingUser = await User.findOne({
            where: {
                email: {
                    [Op.eq]: email  // Use Op.eq to match the email
                }
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }
    
        const newUser = await User.create({ firstName, lastName, email, phone, password: hashedPassword, address});
        return res.status(201).json({ 
            data: newUser,
            message:"Signup successfull"
         });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred while creating the user.' });
    }


}

// export const createUser = async (req: Request, res: Response) => {
//     try {
//         const { firstName, lastName, email, phone, password, address } = req.body;

//         if (!password) {
//             return res.status(400).json({ error: 'Password is required.' });
//         }

//         // Check if user with the given email already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'User with this email already exists.' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = await User.create({
//             firstName,
//             lastName,
//             email,
//             phone,
//             password: hashedPassword,
//             address
//         });

//         return res.status(201).json({
//             data: newUser,
//             message: 'Signup successful'
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'An error occurred while creating the user.' });
//     }
// };

export const updateUserById = async (req:Request,res:Response) =>{
    try{
        if(!req.file){
            const {firstName,lastName,phone,address,status} = req.body;
            console.log("gauravFirstname");
            console.log(firstName);
            const data = await User.update({firstName,lastName,phone,address,status},{
                where:{
                    id:req.params.id
                }
                
            })
            return res.status(201).json({newUpdate:data,message:"Update succesfull"});
        }
        const {firstName,lastName,phone,address,status} = req.body;
       
        
        
        const {path} = req.file;
         
        const data = await User.update({firstName,lastName,phone,address,status,filename:path},{
            where:{
                id:req.params.id
            }
        });
        return res.status(201).json({newUpdate:data,message:"Update succesfull"});
        
    }catch(error){
        return res.status(500).json({ error: 'An error occurred while Updating the user.' });
    }

}
export const deleteUserById = async (req:Request,res:Response) =>{
    try{
        const data = await User.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({message:"Delete succesfull"});
        
    }catch(error){
        return res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }

}