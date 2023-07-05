import { CreateUserRequestDTO } from "../dtos/createUserRequestDTO";
import { CreateUserResponseDTO } from "../dtos/createUserResponseDTO";

export interface IUserRepository {
  create(user: CreateUserRequestDTO): Promise<CreateUserResponseDTO | null>;
  get(): Promise<CreateUserResponseDTO[] | null>;
}
