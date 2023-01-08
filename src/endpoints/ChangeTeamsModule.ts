import { TeamsDatabase } from './../database/teamsDatabase';
import { Request, Response } from "express";
import { ValidateModule } from '../functions/ValidateModule';


export const ChangeTeamsModule = async (req: Request, res: Response): Promise<void> => {

    let errorCode = 400

    try {

        let teamId = req.params.teamId
        let module = req.query.module as string

        if (!teamId) {
            errorCode = 422
            throw new Error("Id da turma faltando.")
        }

        if (!module) {
            errorCode = 422
            throw new Error("Módulo para atualização faltando.")
        }

        const validateModule = ValidateModule(module)

        if (!validateModule) {
            errorCode = 422
            throw new Error("o Valor do módulo deve ser um número.")
        }
        if (Number(module) < 1 || Number(module) > 6) {
            errorCode = 422
            throw new Error("O módulo precisa ser um valor entre 1 até 6.")
        }

        const teamsDatabase = new TeamsDatabase()
        const teamExists = await teamsDatabase.TeamExistsById(teamId)

        if (!teamExists) {
            errorCode = 422
            throw new Error("Turma não cadastrada.")
        }
        if (Number(module) < Number(teamExists.module)) {
            errorCode = 422
            throw new Error("Não é possível regredir de módulo.")
        }

        if (Number(module) === Number(teamExists.module)) {
            errorCode = 422
            throw new Error("Este módulo já é o módulo atual.")
        }
        teamsDatabase.ChangeModuleTeam(teamId, module)

        res.status(201).send("Módulo Alterado com sucesso")

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}