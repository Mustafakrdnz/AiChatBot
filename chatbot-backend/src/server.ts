// src/server.ts
import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Frontend'in çalıştığı adresler
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Chat route
app.use('/chat', chatRouter);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('CORS enabled for:', ['http://localhost:5173', 'http://127.0.0.1:5173']);
});