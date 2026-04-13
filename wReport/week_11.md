# Week 11 Report: Switching to Ollama (Running AI Locally)

## What I Did
I switched from Hugging Face to Ollama. Instead of sending messages to the internet, the AI now runs on my own computer.

## Why Switch to Ollama?
Ollama is better because:
- Works offline (no internet needed)
- Faster responses (no waiting for internet)
- Free to use
- I have full control
- No limits on how many messages I can send

## How I Set It Up

### Installation
1. Downloaded and installed Ollama on my computer
2. Set it up to run on port 11435
3. Picked the Mistral AI model to use

### Connecting the Chatbot
1. Changed the server code to connect to my local Ollama instead of Hugging Face
2. Updated the `.env` file with:
   - `USE_OLLAMA=true` (use Ollama)
   - `OLLAMA_MODEL=mistral` (which AI model to use)
   - `OLLAMA_PORT=11434` (where Ollama is running)

### How Messages Flow Now
1. You type a message in the chat
2. Message goes to Express server
3. Server sends it to Ollama (on my computer)
4. Ollama generates a response
5. Response comes back to the website

## What I Tested
✅ Ollama runs locally
✅ Messages send and receive correctly
✅ AI provides good responses
✅ Example: "Hello! How can I assist you today?"

## Problems I Fixed
- **Port error**: Fixed connection issues by making sure Ollama was on the right port (11435)
- **Response format**: Made sure the server could read Ollama's responses correctly
- **Connection**: Tested that computer-to-Ollama connection was stable

## Result
✅ AI now runs locally on my computer
✅ No internet API needed
✅ Chatbot works great
✅ Ready to make it look nicer

## Next Week
- Make the website dark and modern (like ChatGPT)
- Add ability to save conversations
- Show what the AI is typing
