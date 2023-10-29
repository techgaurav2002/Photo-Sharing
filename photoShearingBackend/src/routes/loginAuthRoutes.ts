import { Router } from "express";
import {Login} from "../controllers/login";

const LoginAuthRoutes = Router();

LoginAuthRoutes.post("/login",Login);


export default LoginAuthRoutes;