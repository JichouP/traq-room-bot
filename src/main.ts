import path from 'path';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cron from 'node-cron';
import serveFavicon from 'serve-favicon';
import internalServerError from './controllers/internalServerError';
import notFound from './controllers/notFound';
import loginCheck from './handlers/loginCheck';
import { roomModel } from './models/room';
import { UserSchema } from './models/user';
import roomRouter from './routes/roomRouter';
import rootRouter from './routes/rootRouter';
import uncheckedRouter from './routes/uncheckedRouter';

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
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          'cdn.tailwindcss.com',
          'code.jquery.com',
          "'unsafe-inline'",
        ],
        imgSrc: ['q.trap.jp', "'self'"],
        scriptSrcAttr: null,
      },
    },
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
    crossOriginEmbedderPolicy: false,
  })
);
app.use(
  cors({
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(morgan('combined', { skip: (_req, res) => res.statusCode < 400 }));
app.use(serveFavicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
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

app.use('/', uncheckedRouter);

app.use(loginCheck);

app.use('/', rootRouter);
app.use('/room', roomRouter);

// 404
app.use('/', notFound);
// 500
app.use(internalServerError);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening at port ${PORT}`);
  });
}

// Clear Room at 0:00 daily
cron.schedule(
  '0 0 * * *',
  async () => {
    await roomModel.deleteMany({});
  },
  { timezone: 'Asia/Tokyo' }
);

export default app;
