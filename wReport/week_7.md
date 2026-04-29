# Week 7 Report: AI Service Migration and Response Handling

## What I Did
I improved the AI backend connection and made the chatbot responses more reliable.

## What I Changed
- Migrated from placeholder replies to Hugging Face-style AI requests
- Updated the server to handle streamed AI response data
- Added better error handling in the chat flow
- Tested the response parsing logic

## Why This Matters
The AI service is the core feature of the chatbot. Better response handling means the app feels smarter and more dependable.

## What I Tested
✅ AI responses show up in the chat
✅ Server handles streaming response chunks
✅ Errors are returned clearly

## Problems I Had
- Parsing streamed JSON lines correctly
- Handling cases when the AI backend returned malformed data

## Result
✅ The chatbot is connected to a real AI service
✅ Messages show proper AI replies
✅ Ready to polish UI and save behavior next week

## Next Week
- Add a dark theme and better styling
- Add rename/delete for saved chats
- Continue improving the user experience
