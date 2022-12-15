import { BaseDatabase } from '../baseDatabase';
import students from './students.json';
import instructors from './instructors.json';
import teams from './teams.json';

export abstract class MigrationDataBase extends BaseDatabase {

    public static startMigration() {

        const createTables = async () => {
            await MigrationDataBase.connection.raw(`
DROP TABLE IF EXISTS  "LabeSystem_students", "LabeSystem_instructors", "LabeSystem_teams" ;);

CREATE TABLE IF NOT EXISTS "LabeSystem_teams"(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    module VARCHAR(255) DEFAULT "0",
);

CREATE TABLE IF NOT EXISTS "LabeSystem_students"(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    birth DATE NOT NULL,
    team_id VARCHAR(255),
    hobby VARCHAR(255)
    FOREIGN KEY (team_id) REFERENCES "LabeSystem_teams(id),
);

CREATE TABLE IF NOT EXISTS "LabeSystem_instructors"(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    birth DATE NOT NULL,
    team_id VARCHAR(255),
    specialty VARCHAR(255)
    FOREIGN KEY (team_id) REFERENCES "LabeSystem_teams(id),
);
    `)
                .then(() => {
                    console.log(`Tables created successfully!`)
                    insertData()
                })
                .catch((error: any) => printError(error))
        }

        const insertData = async () => {
            try {
                await MigrationDataBase.connection("LabeSystem_students")
                    .insert(students)
                    .then(() => console.log(`LabeSystem_students populated!`))
                    .catch((error: any) => printError(error))

                await MigrationDataBase.connection("LabeSystem_instructors")
                    .insert(instructors)
                    .then(() => console.log(`LabeSystem_instructors populated!`))
                    .catch((error: any) => printError(error))

                await MigrationDataBase.connection("LabeSystem_teams")
                    .insert(teams)
                    .then(() => console.log(`LabeSystem_teams populated!`))
                    .catch((error: any) => printError(error))

            } catch (error: any) {
                console.log(error.sqlMessage || error.message)
            } finally {
                console.log("Ending connection!")

                return MigrationDataBase.connection.destroy()
            }
        }

        const printError = (error: any) => {
            console.log(error.sqlMessage || error.message)
        }

        createTables()

    }
}

MigrationDataBase.startMigration()