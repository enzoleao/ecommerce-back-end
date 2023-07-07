import { User } from "@prisma/client";
import { CreateUserRequestDTO } from "../dtos/createUser/createUserRequestDTO";
import { CreateUserResponseDTO } from "../dtos/createUser/createUserResponseDTO";
import { GetAllUsersDTO } from "../dtos/getAllUsers/getAllUsersDTO";

export interface IUserRepository {
  create(user: CreateUserRequestDTO): Promise<CreateUserResponseDTO | null>;
  get(): Promise<GetAllUsersDTO[] | null>;
  findUser(email: string): Promise<User | null>;
}
