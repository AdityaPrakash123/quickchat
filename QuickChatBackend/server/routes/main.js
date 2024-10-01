import express from 'express';
import userRoutes from './userRoutes.js';
import chatRoutes from './chatRoutes.js';
import messageRoutes from './messageRoutes.js';

const route = express();

route.use('/api/user', userRoutes);
route.use('/api/chat', chatRoutes);
route.use('/api/message', messageRoutes);

export default route;
