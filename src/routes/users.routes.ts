import { Router } from "express";
import { CreateUserController } from "../modules/Users/useCases/createUser/createUser.controller";
import { GetAllUsersController } from "../modules/Users/useCases/getAllUsers/getAllUsers.controller";
import { validateRegisterFields } from "../middleware/validateRegisterFields.middleware";
import { authorize } from "express-acl";
const usersRouter = Router();

const createUserController = new CreateUserController();
const getAllUsersController = new GetAllUsersController();

usersRouter.use(authorize);
usersRouter.get("/", getAllUsersController.handle);
usersRouter.post("/", validateRegisterFields, createUserController.handle);
usersRouter.put("/:id");
usersRouter.delete("/:id");
export default usersRouter;
