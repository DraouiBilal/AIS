import { Request, Response } from "express";
import { runModel } from "../utils/runModel";

const rootPath = 'python/models'

export const trainModel = async (req: Request, res: Response) => {
    const r = await runModel(`python3 ${rootPath}/linear-regression.py`);
    res.json({result: JSON.parse(r)});
}
