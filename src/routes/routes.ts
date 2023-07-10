import usersRoutes from "./users.routes";
import authRoutes from "./authRoutes.routes";
import { Router } from "express";
import { EnsureAuthenticateMiddleware } from "../middleware/ensureAuthenticated.middleware";

const routes = Router();

routes.use("/users", EnsureAuthenticateMiddleware, usersRoutes);
routes.use(authRoutes);
export default routes;
