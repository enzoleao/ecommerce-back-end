import { prisma } from "../../../../prisma";
import { IUserRepository } from "../User.repository";
import { CreateUserRequestDTO } from "../../dtos/createUser/createUserRequestDTO";
import { CreateUserResponseDTO } from "../../dtos/createUser/createUserResponseDTO";
import { AppError } from "../../../../err/AppError";
import { GetAllUsersDTO } from "../../dtos/getAllUsers/getAllUsersDTO";
import { User } from "@prisma/client";

export class UserRepository implements IUserRepository {
  async findUser(email: string): Promise<User | null> {
    const response = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
    return response;
  }

  async get(): Promise<GetAllUsersDTO[] | null> {
    const response = await prisma.user.findMany();
    return response.map((i) => {
      return { ...i, password: undefined };
    });
  }

  async create(user: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const findUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: user.email }, { cpf: user.cpf }],
      },
    });
    if (findUser) {
      const response =
        findUser.email === user.email && findUser.cpf === user.cpf
          ? ["Este email já esta cadastrado", "Este CPF já esta cadastrado"]
          : ["Este CPF já esta cadastrado"];
      throw new AppError(response, 400);
    }
    const response = await prisma.user.create({
      data: user,
    });
    return { ...response, password: undefined };
  }
}
