import { useState } from 'react';
import { Message } from '../types';
import ChatMessage from './ChatMessage';

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    const userMessage: Message = {
        id: Date.now().toString(),
        content: inputText,
        sender: 'user',
        timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
        console.log('Sending request to backend...'); // Debug log
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ content: inputText }),
        });

        console.log('Response status:', response.status); // Debug log

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Server error');
        }

        const data = await response.json();
        console.log('Response data:', data); // Debug log

        const botMessage: Message = {
            id: data.id,
            content: data.content,
            sender: data.sender,
            timestamp: new Date(data.timestamp)
        };

        setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
        console.error('Detailed error:', error); // Detailed error log
        const errorMessage: Message = {
            id: Date.now().toString(),
            content: error instanceof Error ? error.message : 'Bağlantı hatası oluştu.',
            sender: 'bot',
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
};

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            content={message.content}
            sender={message.sender}
            timestamp={message.timestamp}
          />
        ))}
        {isLoading && (
          <div className="message bot-message">
            <div className="message-content">Yazıyor...</div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Mesajınızı yazın..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Gönder
        </button>
      </form>
    </div>
  );
};

export default ChatBox;