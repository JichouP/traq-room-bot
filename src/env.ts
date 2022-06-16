import dotenv from 'dotenv';
dotenv.config();

if (!process.env.PORT) throw new Error('env PORT is not defined');
if (!process.env.SESSION_SECRET)
  throw new Error('env SESSION_SECRET is not defined');
if (!process.env.MONGO_URL) throw new Error('env MONGO_URL is not defined');
if (!process.env.CLIENT_ID) throw new Error('env CLIENT_ID is not defined');

export const PORT = process.env.PORT;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const MONGO_URL = process.env.MONGO_URL;
export const CLIENT_ID = process.env.CLIENT_ID;
