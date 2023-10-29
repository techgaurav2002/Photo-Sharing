import { Router } from "express";
import {uploads,uploadImages,getAllImageByAlbumId, getImageById, getImageByAlbumIdForPreview, deleteImageById} from '../controllers/imagesController'

const imageRouter = Router();

imageRouter.post("/",uploads,uploadImages);
imageRouter.get("/:id",getAllImageByAlbumId);
imageRouter.get("/singleImage/:id",getImageById);
imageRouter.get("/previewImage/:id",getImageByAlbumIdForPreview);
imageRouter.delete("/:id",deleteImageById);


export default imageRouter;