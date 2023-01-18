import { StudentsHobbiesClass } from './../models/StudentHobby';
import { HobbyClass } from './../models/Hobby';
import { HobbiesDatabase } from '../database/hobbiesDatabase';
import { StudentsHobbiesDatabase } from './../database/studentsHobbiesDatabase';
import { Request, Response } from "express";
import { StudentsDatabase } from '../database/studentsDatabase';
import { PersonClass } from '../models/Person';
import { ValidateDate } from "../functions/ValidateDate";
import { ConvertDate } from "../functions/ConvertDate";

export const CreateStudents = async (req: Request, res: Response): Promise<void> => {

    let errorCode = 400

    try {

        const name = req.body.name
        const email = req.body.email
        const birth = req.body.birth
        const hobbies = req.body.hobbies

        let convertedDate

        if (!name) {
            errorCode = 422
            throw new Error("Nome do novo estudante faltando.")
        }
        if (!email) {
            errorCode = 422
            throw new Error("Email do novo estudante faltando.")
        }
        if (!birth) {
            errorCode = 422
            throw new Error("Data de nascimento do novo estudante faltando.")
        }
        if (!hobbies || !Array.isArray(hobbies)) {
            errorCode = 422
            throw new Error("Os Hobbies do novo estudante estão faltando ou não estão dentro de um array.")
        }
        const studentDatabase = new StudentsDatabase();
        const emailExists = await studentDatabase.StudentEmailExists(email)

        if (emailExists) {
            errorCode = 422
            throw new Error("Este email já foi cadastrado anteriormente.")
        }
        const isValidDate = ValidateDate(birth)

        if (!isValidDate) {
            errorCode = 422
            throw new Error("Data de nascimento inválida, a data precisa ter o formato dd/mm/aaaa.")
        } else {
            convertedDate = ConvertDate(birth)
        }
        const newStudent = new PersonClass(
            Date.now().toString(),
            name,
            email,
            convertedDate,
            '0'
        )

        const hobbiesDatabase = new HobbiesDatabase()
        const studentsHobbiesDatabase = new StudentsHobbiesDatabase()

        await studentDatabase.CreateStudent(newStudent)

        for (let hobby of hobbies) {
            const hobbyExists = await hobbiesDatabase.HobbyExists(hobby)
            if (hobbyExists.length == 0) {
                let newHobby = new HobbyClass(
                    0,
                    hobby
                )
                hobbiesDatabase.CreateHobby(newHobby)
            }
        }
        for (let hobby of hobbies) {
            let hobbyExists = await hobbiesDatabase.HobbyExists(hobby)
            let studentHobby = new StudentsHobbiesClass(
                newStudent.getId(),
                Number(hobbyExists[0].id)
            )
            await studentsHobbiesDatabase.CreateStudentHobby(studentHobby)
        }
        const studentDisplay = {
            "Id": newStudent.getId(),
            "Nome": newStudent.getName(),
            "Email": newStudent.getEmail(),
            "Data de Nascimento": newStudent.getBirth(),
            "Turma": "Não alocado",
            "Hobbies": hobbies
        }
        res.status(201).send({ message: "Novo Estudante adicionado.", Estudante: studentDisplay })
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}


