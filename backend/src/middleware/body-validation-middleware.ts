import {asyncErrorHandler} from "../utils/asyncErrorHandler";
import {BookSchema, TBook} from "../model/book-model";
import {z} from "zod";

export const validateBook = asyncErrorHandler(async (req, _, next) => {

    const convertedBody: TBook = {
        isbn: req.body.isbn,
        title: req.body.title,
        author_id: parseFloat(req.body.author_id),
        publisher: req.body.publisher,
        edition: req.body.edition,
        year_of_publication: req.body.year_of_publication ? parseFloat(req.body.year_of_publication) : undefined,
        copies_available: req.body.copies_available ? parseFloat(req.body.copies_available) : undefined,

    };

    req.body = BookSchema.parse(convertedBody);
    next();
})


// const idSchema = z.number()
//
// const validateIDParams = asyncErrorHandler(async (req, res, next) => {
//
//
//     const {id} = req.params
//
//     req.id = idSchema.parse(id)
//
//
// })