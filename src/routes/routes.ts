import usersRoutes from "./users.routes";
import authRoutes from "./authRoutes.routes";
import { Router } from "express";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use(authRoutes);

export default routes;
