# Week 10 Report: Switching from OpenAI to Hugging Face

## What I Did
I switched the chatbot from using OpenAI to using Hugging Face. OpenAI wasn't working well for my project, so I needed a different service.

## The Problem
OpenAI had some issues:
- It wasn't giving me the flexibility I needed
- It wasn't working well with my code
- It was expensive

## The Solution: Hugging Face
I switched to Hugging Face, which is free and easier to use.

### What I Changed
1. Updated the server code (`server.js`) to connect to Hugging Face instead of OpenAI
2. Added my API key to a file called `.env` (this keeps secrets safe)
3. Tested the chat to make sure it works

### How It Works Now
- When you send a message → it goes to Hugging Face → comes back as a response
- The chat works, messages get sent and received correctly
- The AI replies like before

## What I Tested
✅ Can connect to Hugging Face
✅ Messages send correctly
✅ Chatbot replies work

## Problems I Had
- Getting the API key set up (fixed it)
- Hugging Face's response format was different from OpenAI (had to adjust)

## Result
✅ The chatbot now runs on Hugging Face instead of OpenAI
✅ Everything is working
✅ Ready to make the website look better next week

## Next Week
- Try using Ollama (a way to run AI on my own computer)
- Make the website look like ChatGPT
- Add ability to save chats
