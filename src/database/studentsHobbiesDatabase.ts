import { StudentsHobbiesClass } from './../models/StudentHobby';
import { BaseDatabase } from './baseDatabase'
import { TABLE_STUDENTS_HOBBIES } from './migrations/tableNames'

export class StudentsHobbiesDatabase extends BaseDatabase {


    TABLE_NAME = TABLE_STUDENTS_HOBBIES

    public async GetAllStudentsHobbies() {
        return super.GetAll()
    }

    public async CreateStudentHobby(studentHobby: StudentsHobbiesClass) {
        return super.CreateItem(studentHobby);
    }
}