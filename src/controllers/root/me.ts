import { RequestHandler } from 'express';
import me from '@/traQ/me';

export const getMe: RequestHandler = async (req, res) => {
  const token = req.session.user?.token;
  if (!token) {
    res.sendStatus(400);
    return;
  }

  const meData = await me(token);

  res.status(200).send(meData.data);
};
