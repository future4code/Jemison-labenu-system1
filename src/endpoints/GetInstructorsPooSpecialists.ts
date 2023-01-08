import { InstructorsSpecialtiesDatabase } from './../database/instructorsSpecialtiesDatabase';
import { Request, Response } from "express";


export const GetInstructorsPooSpecialists = async (req: Request, res: Response): Promise<void> => {

    let errorCode = 400

    try {
        const instructorsSpecialtiesDatabase = new InstructorsSpecialtiesDatabase()

        const result = await instructorsSpecialtiesDatabase.GetAllInstructorsSpecialtyPoo()

        res.status(201).send(result)
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}