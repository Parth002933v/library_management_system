import {Request, Response, NextFunction} from "express";
import {CustomError} from "./ErrorObject";

export const asyncErrorHandler = (
    func: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch((err: CustomError) => next(err));
    };
};