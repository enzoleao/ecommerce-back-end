import { Request, Response } from "express";
import { AuthUserUseCase } from "./authUser.usecase";
import { UserRepository } from "../../repositories/implementations/User.repository";

export class AuthUserController {
  async handle(req: Request, res: Response): Promise<any> {
    const authUserUseCase = new AuthUserUseCase(new UserRepository());
    const { email, password } = req.body;
    const response = await authUserUseCase.execute({ email, password });

    return res.status(200).json(response);
  }
}
