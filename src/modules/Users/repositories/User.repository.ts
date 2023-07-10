import { User } from "@prisma/client";
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
} from "../dtos/createUserDTO";
import { GetAllUsersDTO } from "../dtos/getAllUsersDTO";

export interface IUserRepository {
  create(user: CreateUserRequestDTO): Promise<CreateUserResponseDTO | null>;
  get(): Promise<GetAllUsersDTO[] | null>;
  findUser(email: string): Promise<User | null>;
}
