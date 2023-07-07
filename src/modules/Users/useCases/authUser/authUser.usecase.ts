import { compare } from "bcrypt";
import { AppError } from "../../../../err/AppError";
import { IUserRepository } from "../../repositories/User.repository";
import { sign } from "jsonwebtoken";
import { AuthUserDTO } from "../../dtos/authUser/authUserDTO";

interface LoginTypes {
  email: string;
  password: string;
}

export class AuthUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: LoginTypes): Promise<AuthUserDTO | null> {
    const userExist = await this.userRepository.findUser(email);

    if (!userExist) {
      throw new AppError(["Email e/ou senha estão incorretos!!"], 401);
    }
    const passwordMatch = await compare(password, userExist.password);

    if (!passwordMatch) {
      throw new AppError(["Email e/ou senha estão incorretos!!"], 401);
    }

    const token = sign({}, `${process.env.JWTSECRET}`, {
      subject: String(userExist.id),
      expiresIn: 7200,
    });

    return { user: { ...userExist, password: undefined }, token };
  }
}
