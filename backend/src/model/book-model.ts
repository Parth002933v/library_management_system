import knex from "../database/knex";
import {CTable} from "../constants";
import {z} from "zod";


export const BookSchema = z.object({
    id: z.number().optional(),
    isbn: z.string().max(15),
    title: z.string(),
    author_id: z.number().positive(),
    publisher: z.string().optional(),
    edition: z.string().optional(),
    year_of_publication: z.number().min(1000).max(new Date().getFullYear()).optional(),
    copies_available: z.number().optional()
})

export  type TBook = z.infer<typeof BookSchema>


export const BookModel = {

    getAll({authorName, bookTitle}: { bookTitle?: string, authorName?: string }) {

        const BOOK = CTable.BOOKS
        const AUTHOR = CTable.AUTHORS

        const query = knex<TBook>(CTable.BOOKS)

            .join(`${AUTHOR}`, `${BOOK}.author_id`, `${AUTHOR}.id`)

            .select(`${BOOK}.id`, `${BOOK}.isbn`,
                `${BOOK}.title`, `${AUTHOR}.name as author`,
                `${BOOK}.publisher`, `${BOOK}.edition`,
                `${BOOK}.year_of_publication`, `${BOOK}.copies_available`
            )

        if (bookTitle) query.where(`${BOOK}.title`, "Ilike", `%${bookTitle}%`)

        if (authorName) query.andWhere(`${AUTHOR}.name`, "Ilike", `%${authorName}%`)

        query.orderBy("id", "asc")

        return query
    },

    getByISBN(isbn: string) {
        return knex<TBook>(CTable.BOOKS).where({isbn: isbn}).select("*").first()
    },

    new(book: Omit<TBook, "id">) {
        return knex<TBook>(CTable.BOOKS).insert(book).returning("*")
    },

    update(isbn: string, book: Omit<TBook, "id" | "isbn">) {
        return knex<TBook>(CTable.BOOKS).where({isbn: isbn}).update(book).returning("*")
    },

    delete: (isbn: string) => {
        return knex<TBook>(CTable.BOOKS).where({isbn: isbn}).delete().returning(['id', 'title'])

    }


}