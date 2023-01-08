import { StudentsHobbiesClass } from './../models/StudentHobby';
import { BaseDatabase } from './baseDatabase'
import { TABLE_STUDENTS_HOBBIES } from './migrations/tableNames'

export class StudentsHobbiesDatabase extends BaseDatabase {


    TABLE_NAME = TABLE_STUDENTS_HOBBIES

    public async CreateStudentHobby(studentHobby: StudentsHobbiesClass) {
        return super.CreateItem(studentHobby);
    }

    public async GetStudentByHobby(hobby: string) {
        const result = await StudentsHobbiesDatabase.connection.raw(`
            SELECT s.id AS "Id",
            s.name AS "Nome",
            s.email AS "Email",
            DATE_FORMAT(STR_TO_DATE(s.birth, '%Y-%m-%d'), '%d/%m/%Y') AS "data de nascimento",
            t.name AS "Turma",
            h.hobby AS "Hobby"
            FROM LabeSystem_Students_Hobbies sh
            INNER JOIN LabeSystem_Students s ON s.id = sh.student_id
            INNER JOIN LabeSystem_Hobbies h ON h.id = sh.hobby_id
            INNER JOIN LabeSystem_Teams t ON t.id = s.team_id
            WHERE h.hobby = "${hobby}";
`)
        return result[0]
    }
}

