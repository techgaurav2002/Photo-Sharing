import { Request, Response } from 'express';
import Images from "../models/images";
import Album from "../models/album";
import User from "../models/user";
import multer from 'multer';
import upload from '../middleware/upload';
import Settings from '../models/settings';
import { Op } from 'sequelize';
import { OrderItem } from 'sequelize';

export const uploads = upload.array('images', 5);

export const uploadImages = async (req: Request, res: Response) => {
    try {
    //   const userId = 1; 
    //   const albumId = 1; 
    const {UserId,AlbumId} = req.body;
  
      const images = req.files as Express.Multer.File[];
  
      const imageRecords = await Promise.all(
        images.map(async (image) => {
          const createdImage = await Images.create({
            filename: image.filename,
            UserId: UserId,
            AlbumId: AlbumId,
          });
          return createdImage;
        })
      );
  
      res.status(201).json({ message: 'Images uploaded and details saved successfully', images: imageRecords });
    } catch (error) {
      console.error('Error uploading images:', error);
      res.status(500).json({ error: 'An error occurred while uploading images' });
    }
  };

  export const getAllImageByAlbumId =async (req:Request,res:Response) => {
    try{
      const pageSize = 5;
      const page = req.query.page ? parseInt(req.query.page as string): 1;
      const offset = (page-1)*pageSize;
      const searchQuery = req.query.search ? (req.query.search as string).trim(): '';
      const sortByValue = req.query.sortBy ? (req.query.sortBy as string).trim(): '';
      
      const whereClause:any = {
        AlbumId : req.params.id,
        status:1
      }

      if (searchQuery !=='' && searchQuery !== undefined){
        whereClause[Op.or]=[
          {id: {[Op.like]:`%${searchQuery}`}},
          {filename: {[Op.like]:`%${searchQuery}`}},
          
        ]
      }
      const validSortCriteria = ['id', 'createdAt','filename'];
      let orderOption: OrderItem[] = [];

        if (validSortCriteria.includes(sortByValue)) {
         
        orderOption = [[sortByValue, 'DESC']];
        } else {
        
         orderOption = [['filename', 'ASC']];
        }
        const data = await Images.findAll({
          where: whereClause,
          limit: pageSize,
          offset: offset,
          include:[
            {
              model:Album,
              attributes:['name','updatedAt','UserId'],
              include:[
                {
                  model:Settings
                }
              ]
            },
            {
              model:User,
              attributes:['firstName']
            }
          ],
          order: orderOption,
          
        });
        const totalItems = await Images.count({
          where:whereClause,
        });
        const totalPages = Math.ceil(totalItems/pageSize);

        return res.status(200).json({ data: data, totalPages: totalPages, currentPage: page });
      

    }catch(error){
        return res.status(500).json({ error: 'An error occurred while getting all Images of Album.' });
    }
    
}
export const getImageById = async (req:Request,res:Response)=>{
  try{
    const data = await Images.findOne({
      where:{
        id:req.params.id,
        status:1
      }
    })
    return res.status(200).json({data:data});

  }catch(error){
    return res.status(500).json({error:'An error occured while getting image by id'})
  }
}

export const getImageByAlbumIdForPreview = async (req:Request,res:Response)=>{
try{
  const data = await Images.findAll({
    where:{
      AlbumId : req.params.id,
      status:1
    },
    attributes: ['id'], 
  })

  const count = await Images.count({
    where:{
      AlbumId : req.params.id,
      status:1
    },
  })
  return res.status(200).json({data:data,length:count});
  
}catch(error){
  return res.status(500).json({error:'An error occured while getting images by AlbumId'})
}
}

export const deleteImageById = async (req:Request,res:Response)=>{
  try{
    const data = await Images.update({status:0},{
      where:{
        id:req.params.id
      }
    });
    res.status(200).json({message:"Delete successfull"})


  }catch(error){
    return res.status(500).json({error:'An error is occured on deleting the image'})
  }
}
