import { Router } from "express";
import {createAlbum , getAllAlbum,getAlbumById,deleteAlbumById,updateAlbumById} from '../controllers/albumController'

const albumRouter = Router();

albumRouter.get("/",getAllAlbum);
albumRouter.get("/:id",getAlbumById);
albumRouter.post("/",createAlbum);
albumRouter.patch("/:id",updateAlbumById);
albumRouter.delete("/:id",deleteAlbumById);


export default albumRouter;