export interface UpdateUserRequestDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthday: Date;
  password: string;
  user: any;
}
export interface UpdateUserResponseDTO {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  cpf: string;
  birthday: any;
  password: undefined;
}
