export interface AuthUserDTO {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    birthday: Date;
    cpf: string;
    password: undefined;
  };
  token: string;
}
