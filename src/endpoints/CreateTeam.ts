import { TeamsDatabase } from './../database/teamsDatabase';
import { TeamsClass } from './../models/Team';
import { Request, Response } from "express";


export const CreateTeams = async (req: Request, res: Response): Promise<void> => {

    let errorCode = 400

    try {

        const teamName = req.body.teamName

        if (!teamName) {
            errorCode = 422
            throw new Error("Nome da turma nova faltando.")
        } else {

            const teamDatabase = new TeamsDatabase()
            const teamExists = await teamDatabase.TeamExistsByName(teamName)

            if (teamExists.length > 0) {
                errorCode = 422
                throw new Error("Nome da turma já cadastrado anteriormente.")
            } else {
                const team = new TeamsClass(
                    Date.now().toString(),
                    teamName
                )
                teamDatabase.CreateItem(team)
                const teamDisplay = { "Turma": teamName, "Id": team.getId(), "Módulo": 0 }

                res.status(201).send({ message: "Nova Turma adicionada com sucesso.", Turma: teamDisplay })
            }
        }

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}
