import express from 'express';
import internalServerError from './controllers/internalServerError';
import notFound from './controllers/notFound';
import root from './routes/root';

const PORT = process.env.PORT || 3000;

const app = express();

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
