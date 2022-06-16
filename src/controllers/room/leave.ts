import { RequestHandler } from 'express';
import { CHANNEL_ID } from '@/env';
import { room } from '@/models/room';
import traqPostMessage from '@/traQ/traqPostMessage';

const leave: RequestHandler = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  const targetRoom =
    req.query.room === 'progressRoom' ? 'progressRoom' : 'clubroom';
  const message = targetRoom === 'clubroom' ? '部室でた' : '進捗部屋でた';
  await traqPostMessage(req.session.user.token, CHANNEL_ID, message);
  await room.deleteOne({
    trapId: req.session.user.trapId,
    room: targetRoom,
  });

  res.sendStatus(200);
};

export default leave;
