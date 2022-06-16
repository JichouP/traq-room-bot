import { Router } from 'express';
import join from '@/controllers/room/join';
import leave from '@/controllers/room/leave';

const roomRouter = Router();

roomRouter.get('/join', join);
roomRouter.get('/leave', leave);

export default roomRouter;
