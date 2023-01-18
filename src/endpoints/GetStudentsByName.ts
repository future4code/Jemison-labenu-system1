import { Request, Response } from "express";
import { StudentsDatabase } from '../database/studentsDatabase';

export const GetStudentsByName = async (req: Request, res: Response): Promise<void> => {

    let errorCode = 400

    try {

        let name = req.query.name as string


        if (!name) {
            errorCode = 422
            throw new Error("Nome do estudante para a busca faltando.")

        } else {
            const studentsDatabase = new StudentsDatabase()
            const result = await studentsDatabase.GetStudentByName(name)

            res.status(201).send(result)
        }

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}

