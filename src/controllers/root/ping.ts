import { RequestHandler } from 'express';

const ping: RequestHandler = (_req, res) => {
  res.status(200).send('pong');
};

export default ping;
