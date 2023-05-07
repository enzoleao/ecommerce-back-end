"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCase = void 0;
const AppError_1 = require("../../../../err/AppError");
class UpdateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute({ avatar, name, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findById(id);
                const response = yield this.userRepository.update({ avatar, name, id });
                return response;
            }
            catch (_a) {
                throw new AppError_1.AppError("User not found", 404);
            }
        });
    }
}
exports.UpdateUserUseCase = UpdateUserUseCase;