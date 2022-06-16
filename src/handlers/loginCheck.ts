import { RequestHandler } from 'express';
import { CLIENT_ID } from '@/env';

const loginCheck: RequestHandler = (req, res, next) => {
  if (!req.session || !req.session.user) {
    res.redirect(
      `https://q.trap.jp/api/v3/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}`
    );
    return;
  }
  next();
};

export default loginCheck;
