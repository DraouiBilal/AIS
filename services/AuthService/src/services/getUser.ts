import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient()

export const getUserByUsername = async (username: string): Promise<User | null> => {

    const user = await prisma.user.findUnique({
        where:{
            username
        }
    });

    return user;
}

export const getUserById = async (id: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
        where:{
            id
        }
    });

    return user;
}

export const getUserByUsernameOrEmail = async (username:string, email:string): Promise<User | null> => {
    const user = await prisma.user.findFirst({
        where:{
            OR:[
                {email},
                {username}
            ]
        }
    });

    return user;
}