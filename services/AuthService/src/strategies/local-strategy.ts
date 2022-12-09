import {Strategy as LocalStrategy,IVerifyOptions} from 'passport-local';
import * as bcrypt  from "bcrypt";
import { getUserByUsername } from '../services/getUser';
import { User } from '@prisma/client';


type Done = (error: any, user?: any, options?: IVerifyOptions | undefined) => void


const authUser = async (username:string, password:string, done:Done) => {
    
    let user:User | null = null;
    try {
        user = await getUserByUsername(username);
    } catch (error) {
        return done(error);
    }
    
    if(!user){
        return done(null, false, {message: "User not found"});
    }

    let correctPassword:boolean = false;
    
    try {
        correctPassword = await bcrypt.compare(password,user.password)
    } catch (error) {
        return done(error);
    }
    
    if(!correctPassword){
        return done(null, false, {message: "Incorrect password"});
    }

    return done(null, user);
}



export const createLocalStrategy = () => {
    return new LocalStrategy(authUser)
}

