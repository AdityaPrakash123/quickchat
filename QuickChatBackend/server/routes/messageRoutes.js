import express from 'express';
import authMidWare from '../../middleware/authMiddleware.js';
import {
  sendMessage,
  allMessages,
} from '../../controllers/messageController.js';

const router = express.Router();

router.route('/').post(authMidWare, sendMessage);
router.route('/:chatId').get(authMidWare, allMessages);

export default router;
