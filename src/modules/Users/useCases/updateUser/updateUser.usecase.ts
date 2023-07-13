import { hash } from "bcrypt";
import { IUserRepository } from "../../repositories/User.repository";

import {
  UpdateUserRequestDTO,
  UpdateUserResponseDTO,
} from "../../dtos/updateUserDTO";
import { AppError } from "../../../../err/AppError";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute({
    id,
    email,
    name,
    password,
    birthday,
    phone,
    cpf,
    user,
  }: UpdateUserRequestDTO): Promise<UpdateUserResponseDTO | null> {
    const passwordHash = await hash(password, 8);
    if (user?.id !== id && user.role.name !== "admin") {
      throw new AppError(
        [{ msg: "Access Denied", path: "authorization" }],
        403
      );
    }
    const updateUser = await this.userRepository.updateUser({
      id,
      email,
      name,
      password: passwordHash,
      birthday,
      phone,
      cpf,
      user,
    });
    return updateUser;
  }
}
