import express from 'express';
import userRoutes from './userRoutes.js';
import chatRoutes from './chatRoutes.js';

const route = express();

route.use('/api/user', userRoutes);
route.use('/api/chat', chatRoutes);

export default route;
