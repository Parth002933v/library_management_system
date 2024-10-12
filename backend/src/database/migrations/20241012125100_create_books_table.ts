import type {Knex} from "knex";


export async function up(knex: Knex): Promise<void> {


    await knex.schema.createTable("books", (table) => {
        table.increments("id").primary();
        table.string("isbn", 15).notNullable();
        table.string("title").notNullable();
        table.integer("author_id").unsigned().references("id").inTable("authors")
        table.string("publisher")
        table.string("edition")
        table.integer("year_of_publication", 4)
        table.integer("copies_available")
    })

}


export async function down(knex: Knex): Promise<void> {

    return knex.schema.dropTable("books")

}

