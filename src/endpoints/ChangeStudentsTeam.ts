import { TeamsDatabase } from '../database/teamsDatabase';
import { StudentsDatabase } from '../database/studentsDatabase';
import { Request, Response } from "express";


export const ChangeStudentsTeam = async (req: Request, res: Response): Promise<void> => {

    let errorCode = 400

    try {

        let studentId = req.params.studentId
        let teamName = req.query.teamName as string


        if (!studentId) {
            errorCode = 422
            throw new Error("Id do estudante para a troca de turma faltando.")
        }
        if (!teamName) {
            errorCode = 422
            throw new Error("Nome da nova turma do estudante faltando.")
        }

        const studentsDatabase = new StudentsDatabase()
        const studentExists = await studentsDatabase.StudentExists(studentId)

        if (!studentExists) {
            errorCode = 422
            throw new Error("Estudante inesistente.")
        } else {
            const teamsDatabase = new TeamsDatabase()
            const teamExists = await teamsDatabase.TeamExistsByName(teamName)

            if (teamExists.length === 0) {
                errorCode = 422
                throw new Error("Turma inesistente.")
            } else {
                studentsDatabase.ChangeStudentTeam(studentId, teamExists[0].id)
            }
        }

        res.status(201).send("Turma Alterada com sucesso")
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}
