import {asyncErrorHandler} from "../utils/asyncErrorHandler";
import {Request, Response} from "express";
import {BookModel, TBook} from "../model/book-model";
import {SendResponse} from "../utils/ApiResponse";
import {CustomError} from "../utils/ErrorObject";


interface BookQuery {
    title?: string;
    author?: string;
}

export const BookController = {


    getAllBooks: asyncErrorHandler(async (req: Request<{}, {}, {}, BookQuery>, res: Response) => {

        const {title, author} = req.query

        console.log(title, author)

        const books = await BookModel.getAll({bookTitle: title?.trim(), authorName: author?.trim()})

        if (books.length < 1) {
            throw new CustomError({message: "No Records Found", statusCode: 204})
        }

        return SendResponse({res, message: "Got Data", statusCode: 200, data: books, length: books.length})
    }),

    geBookByID: asyncErrorHandler(async (req, res) => {

        const {isbn} = req.params;

        const book = await BookModel.getByISBN(isbn)

        if (!book) {
            throw new CustomError({message: `Book with isnb : ${isbn} is not found`, statusCode: 404})
        }

        return SendResponse({
            res,
            message: "Got the Book!",
            statusCode: 200,
            data: book
        })
    }),

    postBook: asyncErrorHandler(async (req: Request, res: Response) => {
        const body: TBook = req.body
        const result = await BookModel.new(body)
        res.json(result)
    }),

    editBook: asyncErrorHandler(async (req, res) => {

        const {isbn} = req.params

        const body: Omit<TBook, "id" | "isbn"> = req.body

        const book: Omit<TBook, "id" | "isbn"> = {
            title: body.title,
            publisher: body.publisher,
            edition: body.edition,
            copies_available: body.copies_available,
            author_id: body.author_id,
            year_of_publication: body.year_of_publication
        }

        const result = await BookModel.update(isbn, book)

        if (result.length < 1) throw new CustomError({
            message: `Book with isnb : ${isbn} is not found`,
            statusCode: 404
        })

        return SendResponse({res, statusCode: 200, message: "Record has been updated successfully!", data: result})
    }),

    deleteBook: asyncErrorHandler(async (req, res) => {

        const {isbn} = req.params

        const result = await BookModel.delete(isbn)

        if (result.length < 1) throw new CustomError({
            message: `Book with isnb : ${isbn} is not found`,
            statusCode: 404
        })

        return SendResponse({res, statusCode: 200, message: "Record has been deleted successfully!", data: result})
    })


}