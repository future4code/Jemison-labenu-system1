import { PersonClass } from '../models/Person'
import { BaseDatabase } from './baseDatabase'
import { TABLE_INSTRUCTORS } from './migrations/tableNames'

export class InstructorsDatabase extends BaseDatabase {

    TABLE_NAME = TABLE_INSTRUCTORS

    public async CreateInstructor(person: PersonClass) {
        return super.CreateItem(person);
    }

    public async GetInstructorByTeam(teamId: string) {
        const result = await super.GetPersonByTeam(teamId)
        return result
    }

    public async InstructorEmailExists(email: string) {
        const result = await super.PersonEmailExists(email)
        return result

    }

    public async ChangeInstructorTeam(personId: string, teamId: string) {
        return await super.ChangePersonTeam(personId, teamId)

    }

    public async GetAllInstructors() {
        const result = await InstructorsDatabase.connection.raw(`
        SELECT i.id AS Id, i.name AS "Nome", i.email AS "Email", DATE_FORMAT(STR_TO_DATE(i.birth, '%Y-%m-%d'), '%d/%m/%Y') AS "data de nascimento", t.name AS "Turma"
        FROM ${this.TABLE_NAME} i
        INNER JOIN LabeSystem_Teams t ON t.id = i.team_id 
        `)
        return result[0]
    }

    public async InstructorExists(instructorId: string) {

        const instructorExists = await InstructorsDatabase.connection(this.TABLE_NAME).where('id', instructorId)
        return instructorExists.length > 0
    }

    public async GetInstructorsByZodiac() {
        const result = await super.GetPersonByZodiac()
        return result

    }

}