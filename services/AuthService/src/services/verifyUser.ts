import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient()
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,;:!?@#$%^&*()_+~`|}{[]-=<>./';

const generateToken = (size: number): string => {
    const token = [...Array(size)].map(i => chars[Math.random() * chars.length | 0]).join('');
    return token;
}

export const sendToken = async (user: User): Promise<User | null> => {
    const token = generateToken(16);
    let updatedUser: User | null = null;
    try {
        updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                verifyToken: token
            }
        });
    } catch (err: unknown) {
        console.error(err);
        return null;
    }

    try {
        await fetch('http://mail-service:4001/mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: updatedUser.email,
                from:'bilaldraoui22@gmail.com',
                subject: 'Verify your email',
                text: `Your verification token is ${token}`
            })
        })
    } catch (err: unknown) {
        console.error(err);
        return null;
    }

    return updatedUser;
}

export const verifyUser = async (user: User, token: string): Promise<boolean | null> => {
    if (user.verifyToken !== token) {
        return false;
    }
    try {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                verifiedAt: new Date(),
                verifyToken: null
            }
        });   
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
    return true;
}