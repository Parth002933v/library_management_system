import {AuthorModel} from "../model/author-model";
import {NextFunction, Request, Response} from "express";
import {asyncErrorHandler} from "../utils/asyncErrorHandler";
import {SendResponse} from "../utils/ApiResponse";

export const AuthorController = {

    getAllAuthors: asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
        const authors = await AuthorModel.getAll()
        if (authors.length < 1) {
            return SendResponse({message: "No Records Found", res, statusCode: 404})
        }

        return SendResponse({
            res,
            message: "Got Authors",
            statusCode: 200,
            data: authors,
            length: authors.length
        })
    }),

    getAuthorByID: asyncErrorHandler(async (req, res, next) => {

        const {id} = req.params
        const author = await AuthorModel.getByID(id)

        if (!author) {
            return SendResponse({message: "No Records Found", res, statusCode: 404})
        }

        return SendResponse({
            res,
            message: "Got Author",
            statusCode: 200,
            data: author,
        })

    })


}