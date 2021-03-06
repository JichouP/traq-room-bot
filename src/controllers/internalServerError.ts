import { ErrorRequestHandler } from 'express';

const internalServerError: ErrorRequestHandler = (
  err,
  _req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next
) => {
  if (process.env.NODE_ENV !== 'test') console.error(err);
  res.status(500);
  res.send('Internal Server Error');
};

export default internalServerError;
