
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

    public async GetAll(){
       const result = await BaseDatabase.connection(this.TABLE_NAME)
       return result  
    }
    public async CreateItem(item: any) {
         await BaseDatabase.connection(this.TABLE_NAME).insert(item);
     
    }
    public async ChangeTeamPerson(personId: string, teamId: string) {
        await BaseDatabase.connection(this.TABLE_NAME).where({ id: `${personId}` }).update({ team_id: `${teamId}` });
    }

    public async GetPersonByTeam(teamId: string) {
        const result = await BaseDatabase.connection(this.TABLE_NAME).where({ team_id: `${teamId}` });
   return result
    }

}

export default BaseDatabase
