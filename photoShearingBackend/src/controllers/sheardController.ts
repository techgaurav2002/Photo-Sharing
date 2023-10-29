import { Request, Response } from 'express';
import User from '../models/user';
import Sheard from '../models/sheard';
import nodemailer from 'nodemailer';
import Settings from '../models/settings';
import Album from '../models/album';
import { Op } from 'sequelize';
import { OrderItem } from 'sequelize';



const createSheardController = async (req: Request, res: Response) => {
    const { emailList, UserId, AlbumId } = req.body;
    console.log(emailList);


    try {

        const emails = emailList.split(',');

        // Process each email address
        for (const email of emails) {

            const existingUser = await User.findOne({
                where: {
                    email: email.trim(),
                },
            });
            if (!existingUser) {
                const newUser = await User.create({
                    email: email.trim(),
                });



                await Sheard.create({
                    email: email.trim(),
                    UserId: UserId,
                    AlbumId: AlbumId,
                });
            } else {
                await Sheard.create({
                    email: email.trim(),
                    UserId: UserId,
                    AlbumId: AlbumId,
                });
            }

            // Send an email
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'hakergaurav.mkp2000@gmail.com',
                    pass: 'your password'
                }
            });

            const albumLink = `http://localhost:4200/admin/images?albumid=${AlbumId}`

            const mailOptions = {
                from: 'hakergaurav.mkp2000@gmail.com',
                to: email,
                subject: 'Shareing Album Link ',
                text: `Dear User,
                I hope this message finds you well. I wanted to share an album with you where we can upload images and keep our memories together. Here's the album link: ${albumLink}.
                
                If you already have an account, that's fantastic! However, in case you've forgotten your password, I've included instructions below to help you reset it and gain access to your account:

1 :- Visit the Login Page: Go to the platform where the album is hosted. You can find the "Log In" or "Sign In" link at the top right corner of the website.
2 :- Click on "Forgot Password" or "Reset Password": On the login page, you'll see an option like "Forgot Password" or "Reset Password." Please click on that link.
3 :- Enter Your Email Address: You'll be prompted to enter the email address associated with your account. Be sure to use the same email you used to sign up for the platform.
4 :- Receive the Password Reset Email: After submitting your email, check your inbox (and possibly your spam folder) for a password reset email. This email will contain a link to reset your password.
5 :- Reset Your Password: In the email, you'll find a link. Click on it, and you'll be taken to a page where you can create a new password. Choose a strong password and confirm it.
6 :- Login with Your New Password: Once you've successfully reset your password, return to the login page, enter your email address, and use the new password you just created to log in.
7 :- Update Your Profile: After logging in, you can navigate to your profile settings to update any information you'd like to change, such as your profile picture or personal details.
8 :- If you encounter any issues during this process or have questions, please don't hesitate to reach out to our support team at [Support Email Address]. They'll be happy to assist you.

Enjoy sharing and preserving our cherished moments in the album. If you have any further questions or need assistance with anything else, feel free to let me know.

Best regards,
PhotoShearing app`,

            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        }

        res.status(201).json({ message: 'Users and Sheard entries created successfully.' });
    } catch (error) {
        console.error('Error creating users and sheard:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export default createSheardController;




export const getAlbum = async (req: Request, res: Response) => {
    try {
        const pageSize = 5;
        const page = req.query.page ? parseInt(req.query.page as string) : 1;
        const offset = (page - 1) * pageSize;
        const searchQuery = req.query.search ? (req.query.search as string).trim() : '';
        const sortByValue = req.query.sortBy ? (req.query.sortBy as string).trim() : '';
        const email = req.query.email as string;
        const userId = req.query.userId as string;
        const whereClause: any = {
            email: email,
            [Op.and]: [
                { '$Album.status$': 1 },
            ],
        };
        const whereClause2: any = {
            UserId: userId,
            [Op.and]: [
                { '$Album.status$': 1 },
            ],
        }

        if (searchQuery !== '' && searchQuery !== undefined) {
            whereClause[Op.or] = [
                { id: { [Op.like]: `%${searchQuery}%` } },
                {
                    '$Album.name$': {
                        [Op.like]: `%${searchQuery}%`
                    }
                },

            ]
            
        }
        if (searchQuery !== '' && searchQuery !== undefined) {
            whereClause2[Op.or] = [
                { id: { [Op.like]: `%${searchQuery}%` } },
                { email: { [Op.like]: `%${searchQuery}%` } },
                

            ]
            
        }

        const validSortCriteria = ['id', 'createdAt','email'];

        let orderOption: OrderItem[] = [];

        if (validSortCriteria.includes(sortByValue)) {

            orderOption = [[sortByValue, 'ASC']];
        } else {

            orderOption = [['createdAt', 'DESC']];
        }

        if (userId) {

            const data = await Sheard.findAll({
                where: whereClause2,
                limit: pageSize,
                offset: offset,
                include: [
                    {
                        model: Album,
                        required: false,
                        include: [
                            {
                                model: Settings,
                                where: {
                                    isPublic: 1,
                                },
                            }
                        ]
                    },
                    {
                        model: User,
                        attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'password', 'address']
                    }
                ],
                order: orderOption,
            });

            const totalItems = await Sheard.count({
                where: whereClause2,
                include: [
                    {
                        model: Album,
                        required: false,
                        include: [
                            {
                                model: Settings,
                                where: {
                                    isPublic: 1,
                                },
                            }
                        ]
                    },
                ]
            });
            const totalPages = Math.ceil(totalItems / pageSize);
            return res.status(200).json({ data: data, totalPages: totalPages, currentPage: page });
        }

        if (email) {
            const data = await Sheard.findAll({
                where: whereClause,
                limit: pageSize,
                offset: offset,
                include: [
                    {
                        model: Album,
                        required: false,
                        include: [
                            {
                                model: Settings,
                                where: {
                                    isPublic: 1,
                                },
                            }
                        ]
                    },
                    {
                        model: User,
                    }
                ],
                order: orderOption,
            });
            const totalItems = await Sheard.count({
                where: whereClause,
                include: [
                    {
                        model: Album,
                        required: false,
                        include: [
                            {
                                model: Settings,
                                where: {
                                    isPublic: 1,
                                },
                            }
                        ]
                    },
                ]
            });

            const totalPages = Math.ceil(totalItems / pageSize);

            return res.status(200).json({ data: data, totalPages: totalPages, currentPage: page });
        }


    } catch (error) {
        console.error('Error in getting Sheard Album', error);
        res.status(400).json({ message: 'Internal Server error' });
    }

}
export const Count = async (req: Request, res: Response) => {
    try {


        const data = await Sheard.count({
            where: {
                UserId: req.params.id,
                [Op.and]: [
                    { '$Album.status$': 1 },
                ]
            },
            include: [
                {
                    model: Album,
                },
            ]
        });

        return res.status(200).json({ data: data });
    } catch (error) {
        console.error('Error counting Sheard entries', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};





