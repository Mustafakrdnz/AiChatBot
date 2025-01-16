// src/routes/chat.ts
import express, { Router } from 'express';
import { ChatController } from '../controllers/chatController';

const router: Router = express.Router();
const chatController = new ChatController();

router.post('/', (req, res) => {
    chatController.sendMessage(req, res);
});

export default router;