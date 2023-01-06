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
}