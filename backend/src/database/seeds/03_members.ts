import {Knex} from "knex";


export  type TMembers = {
    id: number,
    name: string,
    email: string,
    phone_no: string
}

export async function seed(knex: Knex): Promise<void> {
    await knex("members").del();

    const members: Partial<TMembers>[] = [
        {
            name: "John Doe",
            email: "john.doe@example.com",
            phone_no: '8758651423',
        },
        {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone_no: '8745124562',
        },
        {
            name: "Alice Johnson",
            email: "alice.j@example.com",
            phone_no: '8744125562',
        },
    ]

    await knex("members").insert(members);
};
