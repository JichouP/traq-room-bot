import { Router } from 'express';
import ping from '@/controllers/root/ping';

const root = Router();

root.get('/ping', ping);

export default root;
