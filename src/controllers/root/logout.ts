import { RequestHandler } from 'express';
import { user } from '@/models/user';

const logout: RequestHandler = async (req, res) => {
  if (req.session) {
    if (req.session.user) await user.deleteByTrapId(req.session.user.trapId);
    req.session.destroy(() => {
      return;
    });
  }
  res.sendStatus(200);
};

export default logout;
