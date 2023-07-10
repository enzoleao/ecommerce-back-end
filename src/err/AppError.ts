export interface Erros {
  msg: string;
  path: string;
}
export class AppError {
  public readonly message: Erros[];
  public readonly statusCode: number;

  constructor(message: Erros[], statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
