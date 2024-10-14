import {CTable} from "../constants";
import knex from "../database/knex";
import {z} from "zod";


const AuthorSchema = z.object({
    id: z.number(),
    name: z.string(),
    bio: z.string()
})

export type TAuthor = z.infer<typeof AuthorSchema>


export const AuthorModel = {
    async getAll(): Promise<TAuthor[]> {
        return knex(CTable.AUTHORS).select<TAuthor[]>("*");
    },

    getByID(id: string): Promise<TAuthor | null> {
        return knex(CTable.AUTHORS).where({id: id}).first()
    }


}

