import { Request, Response } from "express";
import { CreateUserRequestDTO } from "../../dtos/createUserDTO";
import { CreateUserUseCase } from "./createUser.usecase";
import { UserRepository } from "../../repositories/implementations/User.repository";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createUserUseCase = new CreateUserUseCase(new UserRepository());

    const { email, name, birthday, phone, cpf, password } =
      req.body as CreateUserRequestDTO;

    const createEmployee = await createUserUseCase.execute({
      name,
      email,
      password,
      birthday,
      phone,
      cpf,
    });
    return res.status(201).json(createEmployee);
  }
}
