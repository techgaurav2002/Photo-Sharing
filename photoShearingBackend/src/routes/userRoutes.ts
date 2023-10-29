import { Router } from "express";
import {getAllUser,getUserById,createUser,updateUserById,deleteUserById} from "../controllers/userController"
import {authenticate} from "../middleware/auth";
import multer from "multer"

const userRouter = Router();
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./public/UserImage/')
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    },
});
const upload = multer({storage})

userRouter.get("/",authenticate,getAllUser);
userRouter.get("/:id",authenticate,getUserById);
userRouter.post("/",createUser);
userRouter.patch("/:id",upload.single("filename"),updateUserById);
userRouter.delete("/:id",authenticate,deleteUserById);

export default userRouter;