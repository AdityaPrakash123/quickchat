import express from 'express';
import userRoutes from './userRoutes.js';

const route = express();

route.get('/', (req, res) => {
  res.send('Hello World!');
});

route.use('/api/user', userRoutes);

export default route;