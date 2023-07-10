export interface CreateUserRequestDTO {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthday: any;
  password: string;
}
export interface CreateUserResponseDTO {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  cpf: string;
  birthday: any;
  password: undefined;
}
