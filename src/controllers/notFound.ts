import { RequestHandler } from 'express';

const notFound: RequestHandler = (_req, res) => {
  res.sendStatus(404);
};

export default notFound;
