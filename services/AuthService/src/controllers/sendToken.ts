import { User } from "@prisma/client";
import { Request, Response } from "express";
import { verifyUser,sendToken as sendTokenService } from "../services";

export const sendToken = async (req: Request, res:Response) => {    
    const user:User|undefined = req.user as User;
    if(user){

        if(user.verifiedAt)
            return res.status(400).json({message: 'User already verified'});
        try {
            await sendTokenService(user);
            return res.status(200).json({message: 'Token sent', user});
        } catch (error) {
            return res.status(500).json({message:"Server error"});
        }    
    }
};

