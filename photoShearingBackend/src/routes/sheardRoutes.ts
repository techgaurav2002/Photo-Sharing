import { Router } from "express";
import createSheardController, { Count, getAlbum } from "../controllers/sheardController";

const sheardRouter = Router();

sheardRouter.post("/",createSheardController);
sheardRouter.get("/",getAlbum);
sheardRouter.get("/:id",Count);

export default sheardRouter;