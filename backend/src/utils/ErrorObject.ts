interface CustomErrorParams {
    message: string;
    statusCode: number;
}

export class CustomError extends Error {
    statusCode: number;
    isOperational: boolean;


    constructor({message, statusCode}: CustomErrorParams) {
        super(message);

        this.statusCode = statusCode;
        this.isOperational = true;


        Error.captureStackTrace(this, this.constructor);
    }
}


export interface KnexError extends CustomError {
    length: number;
    name: string;
    severity: string;
    code: string | "23505" |"23503" | "23502" | "23514" | "22007" | "22003" | "08003" | "08006" | "23511";
    detail: string;
    schema: string;
    table: string;
    constraint: string;
    file: string;
    line: string;
    routine: string;
    statusCode: number;
}

export function isKnexError(error: any): error is KnexError {
    return typeof error.code === "string" || error.detail === "string"
}