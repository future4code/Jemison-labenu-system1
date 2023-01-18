import { StudentsHobbiesDatabase } from './../database/studentsHobbiesDatabase';
import { HobbiesDatabase } from './../database/hobbiesDatabase';
import { Request, Response } from "express";

export const GetStudentsByHobby = async (req: Request, res: Response): Promise<void> => {

    let errorCode = 400

    try {

        let hobby = req.query.hobby as string

        if (!hobby) {
            errorCode = 422
            throw new Error("Hobby para a busca faltando faltando.")
        }
        const hobbiesDatabase = new HobbiesDatabase()
        const hobbyExists = await hobbiesDatabase.HobbyExists(hobby)

        if (hobbyExists.length == 0) {
            errorCode = 422
            throw new Error("Hobby não cadastrado.")
        } else {
            const studentsHobbiesDatabase = new StudentsHobbiesDatabase()
            const result = await studentsHobbiesDatabase.GetStudentByHobby(hobby)

            res.status(201).send(result)
        }

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}
