import express from 'express';
import {
  registerUser,
  loginUser,
  allUsers,
} from '../../controllers/userControllers.js';
import authMidWare from '../../middleware/authMiddleware.js';

const router = express.Router();

// Set the route path to '/signup'
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.route('/').get(authMidWare, allUsers); // search for users except for current logged in user

export default router;
