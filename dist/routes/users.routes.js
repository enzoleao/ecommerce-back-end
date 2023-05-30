"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUser_controller_1 = require("../modules/Users/useCases/createUser/createUser.controller");
const getAllUsers_controller_1 = require("../modules/Users/useCases/getAllUsers/getAllUsers.controller");
const isAuthenticated_1 = require("../middleware/isAuthenticated");
const deleteUser_controller_1 = require("../modules/Users/useCases/deleteUser/deleteUser.controller");
const updateUser_controller_1 = require("../modules/Users/useCases/updateUser/updateUser.controller");
const usersRouter = (0, express_1.Router)();
const createUserController = new createUser_controller_1.CreateUserController();
const getAllUserController = new getAllUsers_controller_1.GetAllUsersController();
const deleteUserController = new deleteUser_controller_1.DeleteUserController();
const updateUserController = new updateUser_controller_1.UpdateUserController();
usersRouter.get('/', isAuthenticated_1.isAuthenticated, getAllUserController.handle);
usersRouter.post('/', createUserController.handle);
usersRouter.put('/:id', isAuthenticated_1.isAuthenticated, updateUserController.handle);
usersRouter.delete('/:id', isAuthenticated_1.isAuthenticated, deleteUserController.handle);
exports.default = usersRouter;
