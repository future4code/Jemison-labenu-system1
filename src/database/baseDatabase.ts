
import knex from "knex"
import dotenv from "dotenv"

dotenv.config()

export abstract class BaseDatabase {
    protected static connection = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            multipleStatements: true
        }
    });

    abstract TABLE_NAME: string;

    public async CreateItem(item: any) {
        await BaseDatabase.connection(this.TABLE_NAME).insert(item);

    }
    public async ChangePersonTeam(personId: string, teamId: string) {
        await BaseDatabase.connection(this.TABLE_NAME).where({ id: `${personId}` }).update({ team_id: `${teamId}` });
    }

    public async PersonEmailExists(email: string) {
        const emailExists = await BaseDatabase.connection(this.TABLE_NAME).where('email', email)
        return emailExists.length > 0
    }

    public async GetPersonByTeam(teamId: string) {
        const result = await BaseDatabase.connection.raw(`
        SELECT id AS Id, name AS "Nome", email AS "Email", DATE_FORMAT(STR_TO_DATE(birth, '%Y-%m-%d'), '%d/%m/%Y') AS "data de nascimento" FROM ${this.TABLE_NAME}
        WHERE team_id = "${teamId}"; 
    `)
        return result[0]
    }

    public async GetPersonByZodiac() {
        const result = await BaseDatabase.connection.raw(`
            SELECT id AS "Id", name AS "nome", email AS "Email",DATE_FORMAT(STR_TO_DATE(birth, '%Y-%m-%d'), '%d/%m/%Y') AS "data de nascimento",
                case  
                WHEN (MONTH(birth) = 3 AND DAYOFMONTH(birth) >= 21) OR (MONTH(birth) = 4 AND DAYOFMONTH(birth) <= 19) THEN 'Áries'
                WHEN (MONTH(birth) = 4 AND DAYOFMONTH(birth) >= 20) OR (MONTH(birth) = 5 AND DAYOFMONTH(birth) <= 20) THEN 'Touro'
                WHEN (MONTH(birth) = 5 AND DAYOFMONTH(birth) >= 21) OR (MONTH(birth) = 6 AND DAYOFMONTH(birth) <= 20) THEN 'Gêmeos'
                WHEN (MONTH(birth) = 6 AND DAYOFMONTH(birth) >= 21) OR (MONTH(birth) = 7 AND DAYOFMONTH(birth) <= 20) THEN 'Câncer'
                WHEN (MONTH(birth) = 7 AND DAYOFMONTH(birth) >= 21) OR (MONTH(birth) = 8 AND DAYOFMONTH(birth) <= 20) THEN 'Leão'
                WHEN (MONTH(birth) = 8 AND DAYOFMONTH(birth) >= 21) OR (MONTH(birth) = 9 AND DAYOFMONTH(birth) <= 20) THEN 'Virgem'
                WHEN (MONTH(birth) = 9 AND DAYOFMONTH(birth) >= 21) OR (MONTH(birth) = 10 AND DAYOFMONTH(birth) <= 20) THEN 'Libra'
                WHEN (MONTH(birth) = 10 AND DAYOFMONTH(birth) >= 21) OR (MONTH(birth) = 11 AND DAYOFMONTH(birth) <= 20) THEN 'Escorpião'
                WHEN (MONTH(birth) = 11 AND DAYOFMONTH(birth) >= 21) OR (MONTH(birth) = 12 AND DAYOFMONTH(birth) <= 20) THEN 'Sagitário'
                WHEN (MONTH(birth) = 12 AND DAYOFMONTH(birth) >= 21) OR (MONTH(birth) = 1 AND DAYOFMONTH(birth) <= 20) THEN 'Capricórnio'
                WHEN (MONTH(birth) = 1 AND DAYOFMONTH(birth) >= 21) OR (MONTH(birth) = 2 AND DAYOFMONTH(birth) <= 20) THEN 'Aquário'
                WHEN (MONTH(birth) = 2 AND DAYOFMONTH(birth) >= 21) OR (MONTH(birth) = 3 AND DAYOFMONTH(birth) <= 20) THEN 'Peixes'
                end 'Signo'
                FROM ${this.TABLE_NAME}
            `)
            return result[0]
    }

}

