/*/ src/index.ts
import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Frontend adresinizi buraya yazın
}));
app.use(express.json());

app.post('/chat', async (req: Request, res: Response) => {
  const userMessage = req.body.content;

  try {
    const ollamaResponse = await axios.post('http://localhost:11434/generate', {
      prompt: userMessage,
      model: 'llama2',
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const botMessage: Message = {
      id: Date.now().toString(),
      content: (ollamaResponse.data as { response: string }).response, // Ollama API'den gelen yanıt
      sender: 'bot',
      timestamp: new Date(),
    };

    res.json(botMessage);
  } catch (error: any) {
    console.error('Ollama API ile iletişimde hata:', error.message);
    const errorMessage: Message = {
      id: Date.now().toString(),
      content: 'Üzgünüm, bir hata oluştu.',
      sender: 'bot',
      timestamp: new Date(),
    };
    res.status(500).json(errorMessage);
  }
});

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor`);
});*/