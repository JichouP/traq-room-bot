import { Router } from 'express';
import join from '@/controllers/room/join';
import leave from '@/controllers/room/leave';
import status from '@/controllers/room/status';

const roomRouter = Router();

roomRouter.get('/status', status);
roomRouter.get('/join', join);
roomRouter.get('/leave', leave);

export default roomRouter;
