import { Request, Response } from 'express';
import User from "../models/user";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";
import mailgun from 'mailgun-js';
export const forgotPassword = async (req: Request, res: Response) => {

    try {
        const { email } = req.body;
    
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        const token = crypto.randomBytes(20).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); 
    
        user.resetToken = token;
        user.resetTokenExpiration = expiresAt;
       await user.save();


    
       
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'Your email',
              pass: 'your password'
            }
        });
        // const resetLink = `http://localhost:3000/reset-password/${token}`;
        const resetLink = `http://localhost:4200/resetPassword?token=${token}`;

        const mailOptions = {
          from: 'hakergaurav.mkp2000@gmail.com',
          to: user.email,
          subject: 'Password Reset',
          text: `Click the following link to reset your password: ${resetLink}`,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'An error occurred while sending reset password email' });
          } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Password reset token sent successfully' });
          }
        });
      } catch (error) {
        console.error('Error sending reset password token:', error);
        res.status(500).json({ error: 'An error occurred while sending reset password token' });
      }
}
// const mg = mailgun({ apiKey: 'sandbox4c645e86cbf345b290eee42202ab831a.mailgun.org', domain: 'pubkey-03270175ccb109977a8c15849f35d459' });

// export const forgotPassword = async (req: Request, res: Response) => {

//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

    
//     const token = crypto.randomBytes(20).toString('hex');
//     const expiresAt = new Date(Date.now() + 3600000); // Token expires in 1 hour

    
//     user.resetToken = token;
//     user.resetTokenExpiration = expiresAt;
//     await user.save();

//     // Send email with reset link using Mailgun
//     const resetLink = `http://localhost:3000/reset-password/${token}`;
//     const data = {
//       from: 'hackergaurav.mkp2002@gmail.com',
//       to: user.email,
//       subject: 'Password Reset',
//       text: `Click the following link to reset your password: ${resetLink}`,
//     };

//     mg.messages().send(data, (error, body) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Error sending email.' });
//       }
//       return res.json({ message: 'Password reset email sent.' });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }

// }



export const resetPassword = async (req: Request, res: Response) => {
  try {
    const token  = req.params.token;
    // console.log("forgot token");
    // console.log(token);
    
    
    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json({ error: 'New Password is required.' });
  }

    
    const user = await User.findOne({ where: { resetToken: token } });

    if (!user) {
      return res.status(404).json({ message: 'Token not found.' });
    }

    
    if (user.resetTokenExpiration && user.resetTokenExpiration < new Date()) {
      return res.status(400).json({ message: 'Token has expired.' });
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
        // console.log(hashedPassword);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();

    return res.json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
