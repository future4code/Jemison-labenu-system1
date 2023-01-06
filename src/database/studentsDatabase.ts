import { PersonClass } from '../models/Person'
import { BaseDatabase } from './baseDatabase'
import { TABLE_STUDENTS } from './migrations/tableNames'

export class StudentsDatabase extends BaseDatabase {

    TABLE_NAME = TABLE_STUDENTS

    public async CreateStudent(person: PersonClass) {
        return await super.CreateItem(person);
    }

    public async ChangeStudentTeam(personId: string, teamId: string) {
        return await super.ChangePersonTeam(personId, teamId)

    }

    public async GetPersonByTeam(teamId: string) {
        return await super.GetPersonByTeam(teamId)
    }

    public async GetStudentByName(name: string) {
        const result = await StudentsDatabase.connection.raw(`
           SELECT id AS Id, name AS "Nome", email AS "Email", DATE_FORMAT(STR_TO_DATE(birth, '%Y-%m-%d'), '%d/%m/%Y') AS "data de nascimento", team_id AS "Turma" FROM ${this.TABLE_NAME}
           WHERE name LIKE "%${name}%" 
       `)
        return result[0]
    }

    public async GetStudentByTeam(teamId: string) {
        const result = await super.GetPersonByTeam(teamId)
        return result
    }

    public async StudentEmailExists(email: string) {
        const emailExists = await StudentsDatabase.connection(this.TABLE_NAME).where('email', email)
        return emailExists.length > 0
    }

    public async StudentExists(studentId: string) {

        const studentExists = await StudentsDatabase.connection(this.TABLE_NAME).where('id', studentId)
        return studentExists.length > 0
    }



}