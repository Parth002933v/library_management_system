import {Knex} from "knex";
import {TBook} from "../../model/book-model";


export async function seed(knex: Knex): Promise<void> {
    await knex("books").del();

    const books: Partial<TBook>[] = [
        {
            isbn: "9780132350884",
            title: "Clean Code",
            author_id: 1,
            publisher: "Prentice Hall",
            edition: "1st",
            year_of_publication: 2008,
            copies_available: 3
        },
        {
            isbn: "9780201616224",
            title: "The Pragmatic Programmer",
            author_id: 2,
            publisher: "Addison-Wesley",
            edition: "2nd",
            year_of_publication: 1999,
            copies_available: 2
        },
        {
            isbn: "9780131103627",
            title: "The C Programming Language",
            author_id: 3,
            publisher: "Prentice Hall   ",
            edition: "2nd",
            year_of_publication: 1988,
            copies_available: 5
        },
    ]

    await knex<TBook>("books").insert(books);
};
