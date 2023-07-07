import { NextFunction, Response, Request } from "express";

export const validatePermission = (roles: string) => {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
    }
  };
};
