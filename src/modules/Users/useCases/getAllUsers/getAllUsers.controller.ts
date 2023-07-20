import { Request, Response } from "express";
import { UserRepository } from "../../repositories/implementations/User.repository";
import { GetAllUsersUseCase } from "./getAllUsers.usecase";

export class GetAllUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const getAllUsersUseCase = new GetAllUsersUseCase(new UserRepository());
    const getAllUsers = await getAllUsersUseCase.execute();
    return res.status(200).json(getAllUsers);
  }
}
