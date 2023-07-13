import { prisma } from "../../../../prisma";
import { IUserRepository } from "../User.repository";
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
} from "../../dtos/createUserDTO";
import { AppError } from "../../../../err/AppError";
import { GetAllUsersDTO } from "../../dtos/getAllUsersDTO";
import { User } from "@prisma/client";
import {
  UpdateUserRequestDTO,
  UpdateUserResponseDTO,
} from "../../dtos/updateUserDTO";

export class UserRepository implements IUserRepository {
  async updateUser(
    updateUser: UpdateUserRequestDTO
  ): Promise<UpdateUserResponseDTO | null> {
    const { id, name, email, password, phone, birthday } = updateUser;

    const findUser = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
    const response = await prisma.user.update({
      data: {
        name: name || findUser.name,
        email: email || findUser.email,
        phone: phone || findUser.phone,
        birthday: birthday || findUser.birthday,
        password: password || findUser.password,
      },
      where: {
        id,
      },
    });
    return { ...response, password: undefined };
  }

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
