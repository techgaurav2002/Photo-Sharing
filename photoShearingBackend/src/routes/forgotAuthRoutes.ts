import { Router } from "express";
import {forgotPassword,resetPassword} from "../controllers/forgot";

const ForgotAuthRoutes = Router();

ForgotAuthRoutes.post("/forgot",forgotPassword);
ForgotAuthRoutes.post("/reset-Password/:token",resetPassword)

export default ForgotAuthRoutes;