import { User } from "@prisma/client";
import { Request, Response } from "express";
import { verifyUser } from "../services";

export const verifyToken = async (req: Request, res:Response) => {    
    const user:User|undefined = req.user as User;
    if(user){
        
        if(user.verifiedAt)
            return res.status(400).json({message: 'User already verified'});
        
        let isVerified:boolean | null = null;
        try {
            isVerified = await verifyUser(user,req.body.token) 
        } catch (err) {
            return res.status(500).json({message:"Server error"});
        }
        if(!isVerified){
            return res.status(400).json({message:"Invalid token"});
        }
        return res.status(200).json({message:"User verified successfully"});
    }
};

