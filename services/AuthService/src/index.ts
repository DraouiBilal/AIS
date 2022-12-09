import * as express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import { login,getUser, signup, verifyToken, sendToken } from './controllers';
import { createLocalStrategy } from './strategies/local-strategy';
import { getUserById } from './services';
import { User } from '@prisma/client';
import { isAuthenticated } from './middlewares';
import {exec} from 'child_process'

dotenv.config();

const app = express.default();

if(process.env.NODE_ENV === 'DEV'){
    exec("npx prisma studio");
}

// Middlewares
app.use(cors({
    origin: '*',
}))

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false ,
    saveUninitialized: true ,
}))

app.use(passport.initialize())
app.use(passport.session()) 

// Passport config
passport.use(createLocalStrategy())

passport.serializeUser((user:any, done) => done(null, user.id))

passport.deserializeUser(async (id:string, done) => {
    let user:User | null = null;

    try {
        user = await getUserById(id);
    } catch (error) {
        return done(error);
    }

    done (null, user)      
}) 

// Routes
app.post('/auth/login', passport.authenticate('local'), login);
app.post('/auth/signup', signup);
app.post('/auth/verify', isAuthenticated , verifyToken);
app.post('/auth/send-token', isAuthenticated , sendToken);
app.get('/auth/', isAuthenticated, getUser);


// Start the server
if(!process.env.PORT) {
    throw new Error('Please specify a valid port as an environnement variable');
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

