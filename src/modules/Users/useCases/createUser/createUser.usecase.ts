import { hash } from "bcrypt";
import { IUserRepository } from "../../repositories/User.repository";
import { CreateUserRequestDTO } from "../../dtos/createUserRequestDTO";
import { CreateUserResponseDTO } from "../../dtos/createUserResponseDTO";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute({
    email,
    name,
    password,
    birthday,
    phone,
    cpf,
  }: CreateUserRequestDTO): Promise<CreateUserResponseDTO | null> {
    const passwordHash = await hash(password, 8);
    const createdUser = await this.userRepository.create({
      email,
      name,
      password: passwordHash,
      birthday,
      phone,
      cpf,
    });
    return createdUser;
  }
}
