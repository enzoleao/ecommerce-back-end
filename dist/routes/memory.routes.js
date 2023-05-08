"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const allMemoriesCurrentUser_controller_1 = require("../modules/Memory/useCase/allMemoriesCurrentUser/allMemoriesCurrentUser.controller");
const createMemory_controller_1 = require("../modules/Memory/useCase/createMemory/createMemory.controller");
const memoryRouter = (0, express_1.Router)();
const allMemoriesCurrentUserController = new allMemoriesCurrentUser_controller_1.AllMemoriesCurrentUserController();
const createMemoryController = new createMemory_controller_1.CreateMemoryController();
memoryRouter.get('/', allMemoriesCurrentUserController.handle);
memoryRouter.post('/', createMemoryController.handle);
exports.default = memoryRouter;
