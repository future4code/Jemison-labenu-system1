import { InstructorSpecialtyClass } from './../models/InstructorSpecialty';
import { BaseDatabase } from './baseDatabase'
import { TABLE_INSTRUCTORS_SPECIALTIES } from './migrations/tableNames'

export class InstructorsSpecialtiesDatabase extends BaseDatabase {


    TABLE_NAME = TABLE_INSTRUCTORS_SPECIALTIES

    public async CreateInstructorSpecialty(instructorSpecialty: InstructorSpecialtyClass) {
        return super.CreateItem(instructorSpecialty);
    }

    public async GetAllInstructorsSpecialtyPoo() {
        const result = await InstructorsSpecialtiesDatabase.connection.raw(`
            SELECT i.id AS "Id",
            i.name AS "Nome",
            i.email AS "Email",
            DATE_FORMAT(STR_TO_DATE(i.birth, '%Y-%m-%d'), '%d/%m/%Y') AS "data de nascimento",
            t.name AS "Turma",
            s.specialty AS "Especialidade"
            FROM LabeSystem_Instructors_Specialties ie
            INNER JOIN LabeSystem_Instructors i ON i.id = ie.instructor_id
            INNER JOIN LabeSystem_Specialties s ON s.id = ie.specialty_id
            INNER JOIN LabeSystem_Teams t ON t.id = i.team_id
            WHERE s.id = 6;
`)
        return result[0]
    }

    public async GetSpecialtiesByInstructor(instructorId: string){
        let arraySpecialties = []
        const result = await InstructorsSpecialtiesDatabase.connection.raw(`
        SELECT  s.specialty 
        FROM LabeSystem_Instructors_Specialties ie
        INNER JOIN LabeSystem_Specialties s ON s.id = ie.specialty_id
        WHERE ie.instructor_id = "${instructorId}";
        `)
        for(let specialty of result[0] ){
 
            arraySpecialties.push(specialty.specialty)
        }

        return arraySpecialties
    }
}