import { RequestHandler } from 'express';
import { room } from '@/models/room';

const getRoomStatus: RequestHandler = async (req, res) => {
  const status = await room.findList(
    {},
    { name: 1, room: 1, createdAt: 1, _id: 0 }
  );

  res.status(200).json(status);
};

export default getRoomStatus;
