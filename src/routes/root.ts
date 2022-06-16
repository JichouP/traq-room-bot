import { Router } from 'express';
import { getMe } from '@/controllers/root/me';
import getPing from '@/controllers/root/ping';

const root = Router();

root.get('/ping', getPing);
root.get('/me', getMe);

export default root;
