---
marp: true
---

# Chatbot Project Presentation

## Overview
A chatbot web app with local AI support, saved chat management, and polished UI.

---

## Timeline
- Week 1-5: Setup, chat UI, server connection, message flow
- Week 6-9: Saved chats, storage, dark theme, management features
- Week 10-16: AI migration, Ollama integration, sidebar, export, polish

---

## Sprint 1 Highlights
- Built the initial chat interface
- Connected frontend to Express backend
- Implemented message rendering and chat flow
- Added local saved chat persistence
- Designed a dark theme UI

---

## Sprint 2 Highlights
- Added saved chat rename and delete support
- Added export/download capability
- Integrated Ollama for local AI inference
- Improved response handling and typing indicator
- Finalized responsive layout and UX polish

---

## Architecture
- Frontend: `index.html`, `style.css`, `script.js`
- Backend: `server.js` with Express
- AI: Ollama local model via `/chat`
- Storage: Browser `localStorage`

---

## Key Features
- Modern dark chat UI
- User and bot message bubbles
- Save/load/rename/delete conversations
- Export chats to text files
- Local AI execution with Ollama

---

## Design & Usability
- Clear message alignment by sender
- Sidebar for saved conversation management
- Simple controls: send, save, load, rename, delete, export
- Responsive layout for desktop and smaller windows

---

## Lessons Learned
- Local AI integration is flexible and powerful
- Browser storage is effective for offline persistence
- Clean UI improves usability dramatically
- Testing ensures stability across features

---

## Next Steps
- Add search in saved chats
- Support Markdown and rich text
- Add voice input / speech output
- Add cloud backup for saved history
