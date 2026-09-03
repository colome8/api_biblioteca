import type { Request , Response, NextFunction } from "express";

export const logger = (requ:Request, res: Response, next: NextFunction) => {
    console.log(`${requ.method} ${requ.url}`);
    next();
};
