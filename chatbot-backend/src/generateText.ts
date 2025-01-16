/*/ src/generateText.ts
import axios from 'axios';

const generateText = async (prompt: string): Promise<string> => {
  try {
    // Ollama sunucusuna istek gönderme
    const response = await axios.post(
      'http://localhost:11434/generate',
      {
        model: 'llama3.2:3b', // Kullandığınız modelin ismini yazın
        prompt: prompt,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Ollama'dan gelen yanıtı işleyin
    const generatedText = response.data?.response || '';
    return generatedText.trim();
  } catch (error) {
    console.error('Ollama isteği sırasında hata oluştu:', error);
    throw new Error('Metin oluşturulamadı.');
  }
};

export default generateText;*/