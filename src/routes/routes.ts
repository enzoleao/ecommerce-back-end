import usersRoutes from "./users.routes";
import authRoutes from "./authRoutes.routes";
import { Router } from "express";
import { authorize } from "express-acl";

const routes = Router();

routes.use(authorize);
routes.use("/users", usersRoutes);
routes.use(authRoutes);
export default routes;
