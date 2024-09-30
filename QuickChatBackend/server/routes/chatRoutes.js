import express from 'express';
import authMidWare from '../../middleware/authMiddleware.js';
import {
  accessChat,
  fetchCatchs,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} from '../../controllers/chatContoller.js';

const router = express.Router();

router.route('/').post(authMidWare, accessChat);
router.route('/').get(authMidWare, fetchCatchs);
router.route('/group').post(authMidWare, createGroupChat);
router.route('/rename').put(authMidWare, renameGroup);
router.route('/groupremove').put(authMidWare, removeFromGroup);
router.route('/groupadd').put(authMidWare, addToGroup);

export default router;
