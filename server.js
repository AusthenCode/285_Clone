const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

require('dotenv').config();
const USE_OLLAMA = process.env.USE_OLLAMA !== 'false';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'mistral';
const OLLAMA_PORT = process.env.OLLAMA_PORT || '11434';
const rawOllamaHost = process.env.OLLAMA_HOST || `localhost:${OLLAMA_PORT}`;
const OLLAMA_HOST = rawOllamaHost.match(/^https?:\/\//) ? rawOllamaHost : `http://${rawOllamaHost}`;

// Ensure `fetch` is available in older Node versions by lazy-loading `node-fetch` if needed.
if (typeof fetch === 'undefined') {
  try {
    // dynamic import to avoid adding a required dependency unless necessary
    global.fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
  } catch (e) {
    console.warn('node-fetch dynamic import failed; ensure Node 18+ or install node-fetch.');
  }
}

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) return res.status(400).json({ reply: 'No message provided' });

    if (!USE_OLLAMA) return res.status(500).json({ reply: 'Ollama disabled (set USE_OLLAMA=true in .env)' });

    const ollamaUrl = `${OLLAMA_HOST}/api/generate`;
    console.log(`Ollama request -> ${ollamaUrl}  model=${OLLAMA_MODEL}`);

    const resp = await fetch(ollamaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: OLLAMA_MODEL, prompt: userMessage, max_tokens: 300, stream: true })
    });

    if (!resp.ok) {
      const raw = await resp.text();
      throw new Error(`Ollama error ${resp.status}: ${raw}`);
    }

    // Handle streaming response
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      if (readerDone) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim());

      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.response) {
            fullResponse += parsed.response;
          }
          if (parsed.done) {
            done = true;
            break;
          }
        } catch (e) {
          console.warn('Failed to parse line:', line);
        }
      }
    }

    console.log('Full Ollama response:', fullResponse);
    res.json({ reply: fullResponse });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ reply: 'Error talking to Ollama: ' + (err.message || String(err)) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} (Ollama port ${OLLAMA_PORT})`));
