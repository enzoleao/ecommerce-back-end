import { NextFunction, Response, Request } from "express";

import { body, validationResult } from "express-validator";

export const validateRegisterFields = [
  body("name").notEmpty().withMessage("O nome é obrigatório"),
  body("email").isEmail().withMessage("Preencha seu email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("A senha deve ter no mínimo 6 caracteres"),
  body("cpf").notEmpty().withMessage("Preencha seu CPF"),
  body("birthday").notEmpty().withMessage("Preencha sua data de nascimento"),

  async (req: Request, res: Response, next: NextFunction) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({
        erros: erros.array().map((i: any) => {
          return {
            path: i.path,
            msg: i.msg,
          };
        }),
      });
    }
    next();
  },
];
