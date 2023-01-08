import { TeamsDatabase } from './../database/teamsDatabase';
import { Request, Response } from "express";

export const GetActiveTeams = async (req: Request, res: Response): Promise<void> => {

    let errorCode = 400

    try {

        const teamsDatabase = new TeamsDatabase()
        const result = await teamsDatabase.GetActiveTeams()

        res.status(201).send(result)

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}