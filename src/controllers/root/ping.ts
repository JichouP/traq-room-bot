import { RequestHandler } from 'express';

const getPing: RequestHandler = (_req, res) => {
  res.status(200).send('pong');
};

export default getPing;
