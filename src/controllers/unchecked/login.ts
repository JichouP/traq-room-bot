import { RequestHandler } from 'express';
import { CLIENT_ID } from '@/env';
import { user } from '@/models/user';

const login: RequestHandler = async (req, res) => {
  if (req.session) {
    if (req.session.user) await user.deleteByTrapId(req.session.user.trapId);
    req.session.destroy(() => {
      return;
    });
  }
  return res.redirect(
    `https://q.trap.jp/api/v3/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}`
  );
};

export default login;
