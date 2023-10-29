import { Request, Response } from 'express';
import Album from "../models/album";
import { Op } from 'sequelize';
import Settings from '../models/settings';
import User from '../models/user';
import { OrderItem } from 'sequelize';


export const createAlbum = async (req:Request,res:Response) =>{
    try{
        const {name,UserId} = req.body

        const newAlbum = await Album.create({ name, UserId });
        console.log(newAlbum);
        
        await Settings.create({
            approval: '0',
            ispublic: '0',
            AlbumId: newAlbum.dataValues.id, // Assuming you have an association between Album and Settings
            UserId:newAlbum.dataValues.UserId,
          });

        return res.status(201).json({ 
            data: newAlbum,
            message:"Album created successfully"
         });
    }catch(error){
        console.log(error);
        return res.status(500).json({ error: 'An error occurred while creating the new Album.' });
    }

}
// export const getAllAlbum = async (req: Request, res: Response) => {
//     try {
//         const userId = req.query.userId as string;
        
//         const data = await Album.findAll({
//             where: {
//                 status: { [Op.not]: 0 },
//                 [Op.or]: [
//                     // {'$Settings.isPublic$': 1},
//                     {UserId:userId}
//                 ],
//             },
//             include: [
//                 {
//                     model: Settings,
                    
//                     required: false,
//                 },
//                 {
//                     model: User, 
//                     attributes: ['firstName'], 
//                 },
//             ],
//         });

//         return res.status(200).json({ data: data });
//     } catch (error) {
//         return res.status(500).json({ error: 'An error occurred while getting all Albums.' });
//     }
// };

export const getAllAlbum = async (req: Request, res: Response) => {
    try {
        const pageSize = 5;
        const page = req.query.page ? parseInt(req.query.page as string) : 1;
        const offset = (page - 1) * pageSize;
        const searchQuery = req.query.search ? (req.query.search as string).trim() : '';
        const sortByValue = req.query.sortBy ? (req.query.sortBy as string).trim() : ''; // Corrected this line
        const userId = req.query.userId as string;

        const whereClause: any = {
            status: { [Op.not]: 0 },
            [Op.and]: [
                { UserId: userId },
            ],
        };

        if (searchQuery !== '' && searchQuery !== undefined) {
            whereClause[Op.or] = [
                
                { id: { [Op.like]: `%${searchQuery}%` } },
                { name: { [Op.like]: `%${searchQuery}%` } },
                { UserId: { [Op.like]: `%${searchQuery}%` } },
            ];
        }

        const validSortCriteria = ['name', 'createdAt', 'updateAt']; 

        
        const orderOption: OrderItem[] = validSortCriteria.includes(sortByValue)
    ? [[sortByValue, 'ASC']]
    : [['createdAt', 'DESC']]; 

        const data = await Album.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
            include: [
                {
                    model: Settings,
                    required: false,
                },
                {
                    model: User,
                    attributes: ['firstName'],
                },
            ],
            order: orderOption, 
        });
        const totalItems = await Album.count({
            where: whereClause,
        });

        const totalPages = Math.ceil(totalItems / pageSize);

        return res.status(200).json({ data: data, totalPages: totalPages, currentPage: page });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ error: 'An error occurred while getting all Albums.' });
    }
};



export const getAlbumById = async (req:Request,res:Response) =>{
    try{
        const album = await Album.findOne({
            where:{
                id : req.params.id
            },
            include:[
                {
                    model:Settings
                }
            ]
        })
        const count = await Album.count({
            where:{
                UserId: req.params.id,
                status:1
            }
        })
        return res.status(200).json({data:album,countdata:count});
    }catch(error){
        return res.status(500).json({ error: 'An error occurred while getting Album by Id.' });
    }
}
export const updateAlbumById = async (req:Request,res:Response) =>{
    try{
         
        const {name} = req.body;
        const data = await Album.update({name},{
            where:{
                id:req.params.id
            }
        });
        return res.status(201).json({message:"Update succesfull"});
        
    }catch(error){
        return res.status(500).json({ error: 'An error occurred while Updating the Album.' });
    }

}
export const deleteAlbumById = async (req:Request,res:Response) =>{
    try{
        const data = await Album.update({status:0},{
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({message:"Delete succesfull"});
        
    }catch(error){
        return res.status(500).json({ error: 'An error occurred while deleting the Album.' });
    }

}