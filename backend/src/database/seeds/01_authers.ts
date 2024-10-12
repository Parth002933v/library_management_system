import {Knex} from "knex";


export type TAuthor = {
    id: number
    name: string
    bio: string
}

export async function seed(knex: Knex): Promise<void> {
    await knex("authors").del();

    const authors: Partial<TAuthor>[] = [
        {
            name: "Robert C. Martin",
            bio: "American software engineer and author, known for his books on clean code practices."
        },
        {
            name: "Andrew Hunt & David Thomas",
            bio: "Co-authors of \"The Pragmatic Programmer\", known for their insights on software craftsmanship."
        },
        {
            name: "Brian W. Kernighan & Dennis M. Ritchie",
            bio: "Creators of the C programming language, pioneers in computing."
        }]

    await knex<TAuthor>("authors").insert(authors);
};
