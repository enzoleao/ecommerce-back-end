import { IUserRepository } from "../../repositories/User.repository";
import { GetAllUsersDTO } from "../../dtos/getAllUsers/getAllUsersDTO";

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(): Promise<GetAllUsersDTO[] | null> {
    const response = await this.userRepository.get();
    return response;
  }
}
