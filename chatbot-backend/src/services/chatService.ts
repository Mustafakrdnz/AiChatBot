export class ChatService {
    public async generateResponse(message: string): Promise<string> {
        try {
            console.log('ChatService: Sending request to Ollama');
            
            // localhost yerine 127.0.0.1 kullanalım
            const response = await fetch('http://127.0.0.1:11434/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama3.2:3b',
                    prompt: message,
                    stream: false
                }),
            });

            console.log('ChatService: Ollama response status:', response.status);

            if (!response.ok) {
                throw new Error(`Ollama API error: ${response.status}`);
            }

            const data = await response.json();
            console.log('ChatService: Ollama response data:', data);

            return data.response;
        } catch (error) {
            console.error('ChatService Error:', error);
            throw new Error(error instanceof Error ? 
                `Ollama connection error: ${error.message}` : 
                'Ollama connection error');
        }
    }
}