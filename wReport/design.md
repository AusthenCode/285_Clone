# Project Design Document

## Overview
This chatbot web app is built as a browser-based interface with a Node.js backend. It supports local AI execution through Ollama, browser-based saved chat management, and export capabilities.

## Architecture
- **Frontend**: `index.html`, `style.css`, `script.js`
- **Backend**: `server.js` using Express
- **Storage**: Browser `localStorage` for saved chats
- **AI Integration**: Ollama local model accessed via `/chat`

---

## Components
### Frontend
- **Chat window**: displays conversation messages
- **Input area**: allows user text entry and submit
- **Saved chats sidebar**: lists saved conversations
- **Buttons**: Send, Save Chat, Rename, Load, Delete, Export
- **Typing indicator**: shows status when AI is processing

### Backend
- **Express server**: handles POST `/chat`
- **Environment config**: `.env` controls `USE_OLLAMA`, `OLLAMA_MODEL`, and `OLLAMA_PORT`
- **Response processing**: reads streamed Ollama JSON lines and concatenates replies
- **Error handling**: returns friendly error replies when backend fails

---

## Data Flow
1. User types a message and sends it.
2. Frontend posts the message to `/chat`.
3. Backend forwards the prompt to Ollama and reads streaming results.
4. The chat response is returned to the client.
5. The frontend appends the bot message to the chat window.

---

## Storage Design
- Chats are stored as JSON objects in `localStorage` under `savedChats`.
- Each saved chat includes:
  - `title`
  - `timestamp`
  - `messages` array
- Message entries include:
  - `sender`
  - `text`
  - `time`

---

## UI Design Principles
- Dark theme for modern readability
- Clear distinction between user and AI messages
- Responsive layout with sidebar and main chat area
- Minimal button labels and consistent spacing
- Accessible message text and simple controls

## Technical Requirements
- Run the Node server locally with `node server.js`
- Ensure Ollama is installed and running on the configured port
- Use the browser to open `index.html`

---

## Security and Reliability
- Secrets are kept out of source control via `.env`
- The app degrades gracefully when the AI backend is unavailable
- Local storage persists chat history without server dependencies

## Future Enhancements
- Add conversation search within saved chat history
- Support Markdown rendering in chat messages
- Add voice input and text-to-speech
- Add cloud backup for saved chats
