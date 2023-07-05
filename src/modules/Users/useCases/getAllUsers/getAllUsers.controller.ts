import { Request, Response } from "express";
import { UserRepository } from "../../repositories/implementations/User.repository";
import { GetAllUsersUseCase } from "./getAllUsers.usecase";

export class GetAllUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const getAllUsersUseCase = new GetAllUsersUseCase(new UserRepository());

    const createEmployee = await getAllUsersUseCase.execute();
    return res.status(201).json(createEmployee);
  }
}
