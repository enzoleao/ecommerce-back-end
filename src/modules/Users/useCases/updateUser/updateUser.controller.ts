import { Request, Response } from "express";
import { UpdateUserUseCase } from "./updateUser.usecase";
import { UserRepository } from "../../repositories/implementations/User.repository";
import { UpdateUserRequestDTO } from "../../dtos/updateUserDTO";

export class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateUserUseCase = new UpdateUserUseCase(new UserRepository());

    const { id } = req.params;
    const { email, name, birthday, phone, cpf, password } =
      req.body as UpdateUserRequestDTO;
    const { user } = req;
    const updateUser = await updateUserUseCase.execute({
      name,
      email,
      password,
      birthday,
      phone,
      cpf,
      id,
      user,
    });
    return res.status(201).json(updateUser);
  }
}
