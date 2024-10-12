import type {Knex} from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("members", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email");
        table.string("phone_no", 10).notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("members")
}

