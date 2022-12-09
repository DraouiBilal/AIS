import { User } from "@prisma/client";
import { Request, Response } from "express";

export const login = async (req: Request, res:Response) => {    
    const user:User|undefined = req.user as User;
    res.cookie('userid', user.id, { maxAge: 2592000000, httpOnly: true });
    res.json({message:"Logged in successfully",user});
};

