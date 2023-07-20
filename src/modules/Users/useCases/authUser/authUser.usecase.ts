import { compare } from "bcrypt";
import { AppError } from "../../../../err/AppError";
import { IUserRepository } from "../../repositories/User.repository";
import { sign } from "jsonwebtoken";
import { AuthUserDTO } from "../../dtos/authUserDTO";

interface LoginTypes {
  email: string;
  password: string;
}

export class AuthUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: LoginTypes): Promise<AuthUserDTO | null> {
    if (!email || !password) {
      throw new AppError(
        [{ msg: "Preencha todos os campos", path: "auth" }],
        400
      );
    }
    const userExist: any = await this.userRepository.findUser(email);
    if (!userExist) {
      throw new AppError(
        [{ msg: "E-mail e/ou senha estão incorretos!!", path: "auth" }],
        400
      );
    }

    const passwordMatch = await compare(password, userExist.password);
    if (!passwordMatch) {
      throw new AppError(
        [{ msg: "E-mail e/ou senha estão incorretos!!", path: "auth" }],
        400
      );
    }

    const token = sign(
      {
        id: userExist.id,
        role: userExist.roles,
      },
      `${process.env.JWTSECRET}`,
      {
        subject: String(userExist.id),
        expiresIn: 7200,
      }
    );

    return {
      user: {
        ...userExist,
        password: undefined,
        roleId: undefined,
        roles: userExist.roles,
      },
      token,
    };
  }
}
