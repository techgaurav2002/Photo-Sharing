import { Router } from "express";
import {addSettingById,getSettingById} from '../controllers/settingController'

const settingRouter = Router();

settingRouter.get("/:id",getSettingById);
settingRouter.patch("/:id",addSettingById);

export default settingRouter;