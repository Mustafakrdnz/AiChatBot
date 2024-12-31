import { useState } from 'react';
import { Message } from '../types';
import ChatMessage from './ChatMessage';

const ChatBox = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            content: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages([...messages, newMessage]);
        
        // Bot yanıtı simülasyonu
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: 'Merhaba! Ben bir botum.',
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);

        setInputText('');
    };

    return (
        <div className="chat-box">
            <div className="messages">
                {messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        content={message.content}
                        sender={message.sender}
                    />
                ))}
            </div>
            <form onSubmit={handleSubmit} className="input-form">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Write your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatBox; 