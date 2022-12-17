import { BaseDatabase } from "../baseDatabase"
import { TABLE_STUDENTS, TABLE_INSTRUCTORS, TABLE_TEAMS, TABLE_HOBBIES, TABLE_SPECIALTIES } from './tableNames';
import students from './students.json';
import instructors from './instructors.json';
import teams from './teams.json';
import hobbies from './hobbies.json';
import specialities from './specialties.json';

export abstract class MigrationDataBase extends BaseDatabase {

    public static startMigration() {

        const createTables = async () => {
            await MigrationDataBase.connection.raw(`
DROP TABLE IF EXISTS ${TABLE_STUDENTS}, ${TABLE_INSTRUCTORS}, ${TABLE_TEAMS}, ${TABLE_HOBBIES}, ${TABLE_SPECIALTIES};

CREATE TABLE IF NOT EXISTS ${TABLE_TEAMS}(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    module VARCHAR(255) DEFAULT "0"
);

CREATE TABLE IF NOT EXISTS ${TABLE_HOBBIES}(
    id INT AUTO_INCREMENT PRIMARY KEY,
    hobby VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS ${TABLE_SPECIALTIES}(
    id INT AUTO_INCREMENT PRIMARY KEY,
    specialty varchar(255)
);

CREATE TABLE IF NOT EXISTS ${TABLE_STUDENTS}(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    birth DATE NOT NULL,
    team_id VARCHAR(255) NOT NULL,
    hobby_id INT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES ${TABLE_TEAMS}(id),
    FOREIGN KEY (hobby_id) REFERENCES ${TABLE_HOBBIES}(id)
);

CREATE TABLE IF NOT EXISTS ${TABLE_INSTRUCTORS}(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    birth DATE NOT NULL,
    team_id VARCHAR(255) NOT NULL,
    specialty_id INT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES ${TABLE_TEAMS}(id),
    FOREIGN KEY (specialty_id) REFERENCES ${TABLE_SPECIALTIES}(id)
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
                await MigrationDataBase.connection(`${TABLE_HOBBIES}`)
                    .insert(hobbies)
                    .then(() => console.log(`${TABLE_HOBBIES} populated!`))
                    .catch((error: any) => printError(error))

                await MigrationDataBase.connection(`${TABLE_SPECIALTIES}`)
                    .insert(specialities)
                    .then(() => console.log(`${TABLE_SPECIALTIES} populated!`))
                    .catch((error: any) => printError(error))

                await MigrationDataBase.connection(`${TABLE_TEAMS}`)
                    .insert(teams)
                    .then(() => console.log(`${TABLE_TEAMS} populated!`))
                    .catch((error: any) => printError(error))

                await MigrationDataBase.connection(`${TABLE_STUDENTS}`)
                    .insert(students)
                    .then(() => console.log(`${TABLE_STUDENTS} populated!`))
                    .catch((error: any) => printError(error))

                await MigrationDataBase.connection(`${TABLE_INSTRUCTORS}`)
                    .insert(instructors)
                    .then(() => console.log(`${TABLE_INSTRUCTORS} populated!`))
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
