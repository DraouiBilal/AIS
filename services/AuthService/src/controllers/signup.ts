import { prisma, User } from "@prisma/client";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt"
import {v4 as uuid} from 'uuid';
import { getUserByUsernameOrEmail, sendToken } from "../services";
import { createUser } from "../services";

export const signup = async (req: Request, res:Response) => {    
    const {username,email,password,fullname} = req.body;
    
    let user:User | null = null;
    
    try {
         user = await getUserByUsernameOrEmail(username,email);
    } catch (error) {
        console.error(error);
       return  res.status(500).json({message:"Server error"})
    }
    
    if(user){
        return res.status(400).json({message: "Username or email already exists"});
    }

    let hashedPassword:string = "";
    
    try {
        const salt = await bcrypt.genSalt(12);
        hashedPassword = await bcrypt.hash(password,salt);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"})
    }

    const id = uuid();

    try {
        user = await createUser({username,email,password:hashedPassword,fullname,id});
        console.log(user);
        
        if(user){
            try {
                sendToken(user);
            } catch (err) {
                setTimeout(() => {
                    sendToken(user!);
                },1000 * 60 * 5);
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"})
    }

    res.status(200).json({message:"User created successfully",user});

};

