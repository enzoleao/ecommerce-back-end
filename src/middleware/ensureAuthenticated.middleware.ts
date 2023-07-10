import { NextFunction, Request, Response } from "express";
import { AppError } from "../err/AppError";
import { JwtPayload, verify } from "jsonwebtoken";

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    // eslint-disable-next-line no-unused-vars
    interface Request {
      user?: JwtPayload | string;
    }
  }
}
export const EnsureAuthenticateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError([{ msg: "Token Missing!", path: "authorization" }], 401);
  }
  const token = authorization?.split(" ")[1];
  const tokenDecoded = verify(token, `${process.env.JWTSECRET}`);

  if (tokenDecoded) {
    req.user = tokenDecoded;
    console.log(req.user);
    next();
  } else {
    throw new AppError([{ msg: "Invalid Token!", path: "authorization" }], 401);
  }
};
