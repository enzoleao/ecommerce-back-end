"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getLocation_controller_1 = require("../modules/Location/useCase/getLocations/getLocation.controller");
const locationRouter = (0, express_1.Router)();
const getLocationController = new getLocation_controller_1.GetLocationController();
locationRouter.get('/', getLocationController.handle);
locationRouter.post('/');
locationRouter.put('/:memoryId');
locationRouter.delete('/:memoryId');
exports.default = locationRouter;
