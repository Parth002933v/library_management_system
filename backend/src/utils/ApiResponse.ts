import {Response} from "express";


interface SendResponseParams {
    res: Response;
    statusCode: number;
    TotalPages?: number;
    length?: number;
    message: string;
    data?: any;
}

export const SendResponse = (
    {
        res,
        statusCode,
        length,
        TotalPages,
        message,
        data,
    }: SendResponseParams) => {
    res.status(statusCode).json({
        statusCode: statusCode,
        length: length,
        TotalPages: TotalPages,
        message: message,
        data: data,
    });
};
