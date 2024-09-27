import express from 'express';
import userRoutes from './userRoutes.js';

const route = express();

route.use('/api/user', userRoutes);

export default route;
