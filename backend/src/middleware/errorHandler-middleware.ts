import {NextFunction, Request, Response} from "express";
import {ZodError} from "zod";
import {CustomError, isKnexError, KnexError} from "../utils/ErrorObject";

const devError = ({res, error}: { res: Response; error: CustomError }) => {
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error,
    });
};
const prodError = ({res, error}: { res: Response; error: CustomError }) => {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: error.message,
        });
    } else {
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong",
        });
    }
};


const zodErrorHandler = ({res, error}: { res: Response, error: CustomError & ZodError; }) => {

    res.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: "Validation failed",
            error: error.issues.map(err => ({
                field: err.path.join('.'), // Join path for easier readability
                code: err.code,
                message: err.message,
                // @ts-ignore
                expected: err.expected,
                // @ts-ignore
                received: err.received,
            })),
        }
    )
    ;
}

const knexErrorHandler = ({error, res}: { res: Response, error: KnexError & CustomError }) => {

    if (error.code == "23505") error.message = "Unique violation (duplicate key error)"
    if (error.code == "23503") error.message = "Foreign key violation"
    if (error.code == "23502") error.message = "Not null violation"
    if (error.code == "23514") error.message = "Check violation"
    if (error.code == "22007") error.message = "Invalid datetime format"
    if (error.code == "22003") error.message = "Numeric value out of range"
    if (error.code == "08003") error.message = "Connection does not exist (already closed)"
    if (error.code == "08006") error.message = "Connection failure"
    if (error.code == "23511") error.message = "Exclusion violation"

    res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.detail,
    });

}


export const globalErrorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction
) => {

    error.statusCode = error.statusCode || 500;

    if (!(process.env.NODE_ENV == "production")) {
        devError({res: res, error: error});

    } else {
        if (isKnexError(error)) {
            error.statusCode = 400
            return knexErrorHandler({res: res, error: error})
        }
        if (error instanceof ZodError) {
            error.statusCode = 400
            zodErrorHandler({res: res, error: error})
        }
        prodError({res: res, error: error});

    }
}


