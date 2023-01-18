import { InstructorsDatabase } from './../database/instructorsDatabase';
import { StudentsDatabase } from '../database/studentsDatabase';
import { Request, Response } from "express";
import { TeamsDatabase } from "../database/teamsDatabase";

export const GetAllPersonByTeam = async (req: Request, res: Response): Promise<void> => {

    let errorCode = 400

    try {

        let teamId = req.query.teamId as string

        if (!teamId) {
            errorCode = 422
            throw new Error("ID da turma para realizar a busca faltando.")
        }
        const teamsDatabase = new TeamsDatabase()


        const teamExists = await teamsDatabase.TeamExistsById(teamId)

        if (!teamExists) {
            errorCode = 422
            throw new Error("Turma não cadastrada.")
        } else {
            const studentsDatabase = new StudentsDatabase()
            const students = await studentsDatabase.GetPersonByTeam(teamId)

            const instructorsDatabase = new InstructorsDatabase()
            const instructors = await instructorsDatabase.GetPersonByTeam(teamId)

            const result = { 'Turma': teamExists.name, 'Instrutores': instructors, 'Estudantes': students }

            res.status(201).send(result)
        }
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}