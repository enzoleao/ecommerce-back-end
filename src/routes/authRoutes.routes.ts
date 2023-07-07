import { Router } from "express";
import { AuthUserController } from "../modules/Users/useCases/authUser/authUser.controller";

const authRoutes = Router();
const authUserController = new AuthUserController();

authRoutes.post("/session", authUserController.handle);

export default authRoutes;
