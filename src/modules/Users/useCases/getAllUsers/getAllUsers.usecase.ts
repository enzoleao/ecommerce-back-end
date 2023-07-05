import { IUserRepository } from "../../repositories/User.repository";
import { CreateUserResponseDTO } from "../../dtos/createUserResponseDTO";

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(): Promise<CreateUserResponseDTO[] | null> {
    const response = await this.userRepository.get();
    return response;
  }
}
