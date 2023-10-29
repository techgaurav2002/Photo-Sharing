import { Request, Response } from 'express';
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        

        // Validation
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: 'Please fill all details carefullyyyyy!'
            });
        }

        const user = await User.findOne({
            where: {
                email: email
            }
        });
        // const userID = user.id

        console.log(user);
        

        

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User Not Found, Please Sign Up First!"
            });
        }

        const flag:boolean = await bcrypt.compare(password, user.password);

        
        
        
        
        
        if (flag) {
            // Create JWT token
            
            const payload = {
                email: user.email,
                userId : user.dataValues.id,
            };
            // console.log(payload);
            
    


            // user.dataValues.password = undefined;
           

            const token = jwt.sign(payload, "gaurav", {
                expiresIn: "2h"
            });
            
            Object.assign(user,token);
            // req.body(user);
            console.log(req.body);
            user.dataValues.token = token;
            
            
            


            return res.status(200).json({
                success: true,
                message: "Login successful",
                token: token,
                payload,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while logging in.' });
    }
};