import { TeamsDatabase } from '../database/teamsDatabase';
import { InstructorsDatabase } from '../database/instructorsDatabase';
import { Request, Response } from "express";


export const ChangeInstructorsTeam = async (req: Request, res: Response): Promise<void> => {

    let errorCode = 400

    try {

        let instructorId = req.params.instructorId
        let teamName = req.query.teamName as string


        if (!instructorId) {
            errorCode = 422
            throw new Error("Id do Instrutor para a troca de turma faltando.")
        }
        if (!teamName) {
            errorCode = 422
            throw new Error("Nome da nova turma do Instrutor faltando.")
        }

        const instructorsDatabase = new InstructorsDatabase()
        const instructorExists = await instructorsDatabase.InstructorExists(instructorId)

        if (!instructorExists) {
            errorCode = 422
            throw new Error("Instrutor inesistente.")
        } else {
            const teamsDatabase = new TeamsDatabase()
            const teamExists = await teamsDatabase.TeamExistsByName(teamName)

            if (teamExists.length === 0) {
                errorCode = 422
                throw new Error("Turma inesistente.")
            } else {
                instructorsDatabase.ChangeInstructorTeam(instructorId, teamExists[0].id)
            }
        }

        res.status(201).send("Turma do Instrutor alterada com sucesso.")
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}