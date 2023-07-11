import { prisma } from "../../../../prisma";
import { IUserRepository } from "../User.repository";
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
} from "../../dtos/createUserDTO";
import { AppError } from "../../../../err/AppError";
import { GetAllUsersDTO } from "../../dtos/getAllUsersDTO";
import { User } from "@prisma/client";

export class UserRepository implements IUserRepository {
  async findUser(email: string): Promise<User | null> {
    const response = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        roles: true,
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
      throw new AppError(
        [
          { msg: "Este e-mail já possui cadastro", path: "email" },
          { msg: "Este CPF já possui cadastro", path: "cpf" },
        ],
        400
      );
    }
    const response = await prisma.user.create({
      data: user,
    });
    return { ...response, password: undefined };
  }
}
