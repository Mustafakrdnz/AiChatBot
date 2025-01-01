interface ChatMessageProps {
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date; // Gönderim zamanı
}

const ChatMessage = ({ content, sender, timestamp }: ChatMessageProps) => {
    const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Saat ve dakika
    return (
        <div className={`message ${sender === 'user' ? 'user-message' : 'bot-message'}`}>
            <div className="message-content">{content}</div>
            <div className="message-timestamp">{formattedTime}</div>
        </div>
    );
};

export default ChatMessage;
