import { Router } from "express";
import { CreateUserController } from "../modules/Users/useCases/createUser/createUser.controller";
import { GetAllUsersController } from "../modules/Users/useCases/getAllUsers/getAllUsers.controller";
import { validateRegisterFields } from "../middleware/validateRegisterFields.middleware";
import { UpdateUserController } from "../modules/Users/useCases/updateUser/updateUser.controller";

const usersRouter = Router();

usersRouter.get("/", new GetAllUsersController().handle);
usersRouter.post(
  "/",
  validateRegisterFields,
  new CreateUserController().handle
);
usersRouter.put("/:id", new UpdateUserController().handle);
usersRouter.delete("/:id");
export default usersRouter;
