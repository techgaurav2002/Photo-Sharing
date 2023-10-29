import { Request, Response } from 'express';
import Settings from '../models/settings';
export const getSettingById = async (req: Request, res: Response) => {
    try{
        const data = await Settings.findOne({
            where:{
                AlbumId : req.params.id
            }
        })
        return res.status(200).json({data:data});
    }catch(error){
        return res.status(500).json({ error: 'An error occurred while getting Album Setting by Id.' });
    }
}

export const addSettingById = async (req:Request,res:Response) =>{
    try{
         
        const {approval,ispublic} = req.body;
        const data = await Settings.update({approval,ispublic},{
            where:{
                AlbumId:req.params.id
            }
        });
        return res.status(201).json({message:"Update succesfull"});
        
    }catch(error){
        return res.status(500).json({ error: 'An error occurred while Updating the Album Setting.' });
    }

}