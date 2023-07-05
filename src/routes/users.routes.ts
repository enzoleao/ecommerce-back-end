import { Router } from "express";
import { CreateUserController } from "../modules/Users/useCases/createUser/createUser.controller";
import { GetAllUsersController } from "../modules/Users/useCases/getAllUsers/getAllUsers.controller";

const usersRouter = Router();

const createUserController = new CreateUserController();
const getAllUsersController = new GetAllUsersController();
usersRouter.get("/", getAllUsersController.handle);
usersRouter.post("/", createUserController.handle);
usersRouter.put("/:id");
usersRouter.delete("/:id");

export default usersRouter;
