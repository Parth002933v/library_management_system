import type {Knex} from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("borrowers", (table) => {
        table.increments("id").primary();
        table.integer("book_id").unsigned().references("id").inTable("books")
        table.integer("member_id").unsigned().references("id").inTable("members")
        table.date("borrow_date").notNullable()
        table.date("due_date").notNullable()
        table.date("return_date")
        table.decimal("fine", 5, 2)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("borrowers")
}

