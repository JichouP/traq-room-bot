import { Router } from 'express';
import getPing from '@/controllers/root/ping';

const root = Router();

root.get('/ping', getPing);

export default root;
