// import express from 'express';
// import { registerUser } from '../../controllers/userControllers.js';

// const router = express.Router();

// router.post('/', registerUser);

// export default router;

import express from 'express';
import { registerUser, loginUser } from '../../controllers/userControllers.js';

const router = express.Router();

// Set the route path to '/signup'
router.post('/signup', registerUser);
router.post('/login', loginUser);

export default router;
