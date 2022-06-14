import path from 'path';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import serveFavicon from 'serve-favicon';
import internalServerError from './controllers/internalServerError';
import notFound from './controllers/notFound';
import root from './routes/root';

dotenv.config();

const { PORT, SESSION_SECRET, MONGO_URL, DB_NAME } = process.env;
if (!PORT) throw new Error('env PORT is not defined');
if (!SESSION_SECRET) throw new Error('env SESSION_SECRET is not defined');
if (!MONGO_URL) throw new Error('env MONGO_URL is not defined');
if (!DB_NAME) throw new Error('env DB_NAME is not defined');

const app = express();

app.use(morgan('combined', { skip: (_req, res) => res.statusCode < 400 }));
app.use(serveFavicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      dbName: DB_NAME,
    }),
    resave: false,
    saveUninitialized: false,
  })
);

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
