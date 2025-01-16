import { Request, Response } from 'express';
import { ChatService } from '../services/chatService';

export class ChatController {
    private chatService: ChatService;

    constructor() {
        this.chatService = new ChatService();
    }

    public async sendMessage(req: Request, res: Response): Promise<void> {
        try {
            console.log('Received request:', req.body);

            const { content } = req.body;
            if (!content) {
                res.status(400).json({ error: 'Content is required' });
                return;
            }

            console.log('Sending to Ollama:', content);
            const response = await this.chatService.generateResponse(content);
            console.log('Received from Ollama:', response);

            const botMessage = {
                id: Date.now().toString(),
                content: response,
                sender: 'bot' as const,
                timestamp: new Date()
            };

            console.log('Sending response:', botMessage);
            res.status(200).json(botMessage);
        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({ 
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}