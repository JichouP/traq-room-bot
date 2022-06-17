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
  const { trapId } = req.session.user;

  if (!(await room.findOne({ trapId, room: targetRoom }))) {
    return res.redirect('/');
  }

  await traqPostMessage(req.session.user.token, CHANNEL_ID, message);
  await room.deleteOne({
    trapId,
    room: targetRoom,
  });

  res.redirect('/?status=left');
};

export default leave;
