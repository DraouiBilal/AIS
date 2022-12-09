import { Request, Response } from "express";
import { sendMail } from "../services";


export const sendMailController = async (req: Request, res:Response) => {    
    const msg = req.body;   

    try {
        sendMail(msg);
    } catch (error:unknown) {
        return res.status(400).json({error: error as Error});
    }

    res.status(200).json({message:"Email sent succesfully"})
};

