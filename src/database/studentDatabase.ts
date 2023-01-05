import { PersonClass } from '../models/Person'
import { BaseDatabase } from './baseDatabase'
import { TABLE_STUDENTS } from './migrations/tableNames'

export class StudentsDatabase extends BaseDatabase {

    TABLE_NAME = TABLE_STUDENTS

    public async CreateStudent(person: PersonClass) {
        return super.CreateItem(person);
    }

    public async ChangeTeamPerson(personId: string, teamId: string) {
        return super.ChangeTeamPerson(personId, teamId)

    }

    public async GetPersonByTeam(teamId: string) {
        return super.GetPersonByTeam(teamId)
    }

    public async GetStudentByName(name: string) {
       return await StudentsDatabase.connection(this.TABLE_NAME).whereILike('name', `%${name}%`)
    }

    public async StudentEmailExist(email: string) {
        const emailExists = await StudentsDatabase.connection(this.TABLE_NAME).where('email', email)
        return emailExists.length > 0  
    }



}