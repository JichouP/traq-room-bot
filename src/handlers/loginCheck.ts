import { RequestHandler } from 'express';
import traqGetMe from '@/traQ/traqGetMe';

const loginCheck: RequestHandler = async (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }
  try {
    await traqGetMe(req.session.user.token);
  } catch (e) {
    return res.redirect('/login');
  }
  next();
};

export default loginCheck;
