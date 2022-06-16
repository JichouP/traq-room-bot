import path from 'path';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import serveFavicon from 'serve-favicon';
import internalServerError from './controllers/internalServerError';
import notFound from './controllers/notFound';
import login from './controllers/root/login';
import logout from './controllers/root/logout';
import oauth from './controllers/root/oauth';
import loginCheck from './handlers/loginCheck';
import { UserSchema } from './models/user';
import root from './routes/root';

declare module 'express-session' {
  interface SessionData {
    user: UserSchema;
  }
}

dotenv.config();

const { PORT, SESSION_SECRET, MONGO_URL } = process.env;
if (!PORT) throw new Error('env PORT is not defined');
if (!SESSION_SECRET) throw new Error('env SESSION_SECRET is not defined');
if (!MONGO_URL) throw new Error('env MONGO_URL is not defined');

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGO_URL).catch((err) => {
    throw err;
  });
}

const app = express();

app.set('trust proxy', 1);
app.use(helmet({}));
app.use(
  cors({
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(morgan('combined', { skip: (_req, res) => res.statusCode < 400 }));
app.use(serveFavicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(
    session({
      secret: SESSION_SECRET,
      cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000,
      },
      store: MongoStore.create({
        mongoUrl: MONGO_URL,
      }),
      resave: false,
      saveUninitialized: false,
    })
  );
}

app.get('/oauth', oauth);
app.get('/login', login);
app.get('/logout', logout);

app.use(loginCheck);

app.use('/', root);

app.use('/', notFound);
app.use(internalServerError);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening at port ${PORT}`);
  });
}

export default app;
