import {Knex} from "knex";


export  type TBorrowers = {
    id: number,
    book_id: number,
    member_id: number,
    borrow_date: Date,
    due_date: Date,
    return_date: Date | null,
    fine: number | null
}


export async function seed(knex: Knex): Promise<void> {
    await knex("borrowers").del();

    const borrowers: Partial<TBorrowers>[] = [
        {
            book_id: 1,
            member_id: 1,
            borrow_date: new Date("2023-09-10"),
            due_date: new Date("2023-09-20"),
            return_date: new Date("2023-09-18"),
            fine: 0.00
        },
        {
            book_id: 2,
            member_id: 2,
            borrow_date: new Date("2023-07-05"),
            due_date: new Date("2023-07-15"),
            return_date: new Date("2023-07-20"),
            fine: 5.00
        },
        {
            book_id: 3,
            member_id: 3,
            borrow_date: new Date("2023-10-01"),
            due_date: new Date("2023-10-11"),
            return_date: null,
            fine: null
        },
    ]

    await knex("borrowers").insert(borrowers);
};
