import { InstructorSpecialtyClass } from './../models/InstructorSpecialty';
import { InstructorsSpecialtiesDatabase } from './../database/instructorsSpecialtiesDatabase';
import { SpecialtiesDatabase } from './../database/specialtiesDatabase';
import { PersonClass } from './../models/Person';
import { InstructorsDatabase } from './../database/instructorsDatabase';
import { Request, Response } from "express";
import { ValidateDate } from '../functions/ValidateDate';
import { ConvertDate } from '../functions/ConvertDate';

export const CreateInstructors = async (req: Request, res: Response): Promise<void> => {

    let errorCode = 400

    try {

        const name = req.body.name
        const email = req.body.email
        const birth = req.body.birth
        const specialties = req.body.specialties

        let convertedDate

        if (!name) {
            errorCode = 422
            throw new Error("Nome do novo instrutor faltando.")
        }
        if (!email) {
            errorCode = 422
            throw new Error("Email do novo instrutor faltando.")
        }
        if (!birth) {
            errorCode = 422
            throw new Error("Data de nascimento do novo instrutor faltando.")
        }
        if (!specialties || !Array.isArray(specialties)) {
            errorCode = 422
            throw new Error("As especialidades do novo instrutor estão faltando ou não estão dentro de um array.")
        }
        const instructorDatabase = new InstructorsDatabase();
        const emailExists = await instructorDatabase.InstructorEmailExists(email)

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

        const newInstructor = new PersonClass(
            Date.now().toString(),
            name,
            email,
            convertedDate,
            '0'
        )

        const specialtiesDatabase = new SpecialtiesDatabase()
        const instructorSpecialtiesDatabase = new InstructorsSpecialtiesDatabase()

        for (let specialty of specialties) {
            let specialtyExists = await specialtiesDatabase.SpecialtyExists(specialty)
            if (specialtyExists.length == 0) {
                errorCode = 422
                throw new Error(`A especialidade ${specialty} não está cadastrada, insira uma das especialidades válidas(HTML e CSS, React, Javascript, Typescript, SQL ou Programação Orientada a Objetos).`)
            }
        }

        await instructorDatabase.CreateInstructor(newInstructor)

        for (let specialty of specialties) {

            let specialtyToDb = await specialtiesDatabase.SpecialtyExists(specialty)

            let instructorSpecialty = new InstructorSpecialtyClass(
                newInstructor.getId(),
                Number(specialtyToDb[0].id)
            )

            await instructorSpecialtiesDatabase.CreateInstructorSpecialty(instructorSpecialty)
        }

        const instructorDisplay = {
            "Id": newInstructor.getId(),
            "Nome": newInstructor.getName(),
            "Email": newInstructor.getEmail(),
            "Data de Nascimento": newInstructor.getBirth(),
            "Turma": "Não alocado",
            "Epecialidades": specialties
        }

        res.status(201).send({ message: "Novo Instrutor adicionado.", Instrutor: instructorDisplay })

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}