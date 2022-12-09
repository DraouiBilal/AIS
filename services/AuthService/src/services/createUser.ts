import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient()

type UserInput = {
    username: string;
    email: string;
    password: string;
    fullname: string;
    id:string;
};

export const createUser = async (userInput:UserInput): Promise<User | null> => {
    const {username,email,password,fullname,id} = userInput;
    
    let user:User | null = null;

    user = await prisma.user.create({
        data:{
            username,
            email,
            password,
            fullname,
            id,
            createdAt: new Date(),
            avatar: "https://avatars.githubusercontent.com/u/59531847?v=4"
        }
    });

    return user;
}