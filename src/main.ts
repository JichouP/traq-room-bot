import path from 'path';
import express from 'express';
import morgan from 'morgan';
import serveFavicon from 'serve-favicon';
import internalServerError from './controllers/internalServerError';
import notFound from './controllers/notFound';
import root from './routes/root';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('combined', { skip: (_req, res) => res.statusCode < 400 }));
app.use(serveFavicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
