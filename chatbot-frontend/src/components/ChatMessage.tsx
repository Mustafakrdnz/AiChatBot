interface ChatMessageProps {
    content: string;
    sender: 'user' | 'bot';
}

const ChatMessage = ({ content, sender }: ChatMessageProps) => {
    return (
        <div className={`message ${sender === 'user' ? 'user-message' : 'bot-message'}`}>
            <div className="message-content">
                {content}
            </div>
        </div>
    );
};

export default ChatMessage; 