import { InstructorsSpecialtiesDatabase } from './../database/instructorsSpecialtiesDatabase';
import { InstructorsDatabase } from './../database/instructorsDatabase';
import { Request, Response } from "express";


export const GetAllInstructors = async (req: Request, res: Response): Promise<void> => {

    let errorCode = 400

    try {

        const instructorsDatabase = new InstructorsDatabase()
        const instructorsSpecialtiesDatabase = new InstructorsSpecialtiesDatabase()
        let array = []

        let instructors = await instructorsDatabase.GetAllInstructors()

        for (let instructor of instructors) {
            let specialties = await instructorsSpecialtiesDatabase.GetSpecialtiesByInstructor(instructor.id)


            let newInstructor = { "Instrutor": instructor, "Especialidades": specialties }

            array.push(newInstructor).toString()
        }

        res.status(201).send(array)

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}
