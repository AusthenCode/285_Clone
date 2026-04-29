# Week 4 Report: Backend AI Integration Planning

## What I Did
I started integrating AI backend support and prepared the app for real chatbot responses.

## What I Changed
- Added environment configuration with `.env`
- Created server logic for AI backend requests
- Added support for both OpenAI and Hugging Face style connections
- Tested request/response formats in the server

## Why This Matters
The AI backend is the heart of the chatbot. Planning this integration early keeps the app flexible as the AI service changes.

## What I Tested
✅ Server can make outbound requests
✅ Response format handling works in code
✅ Environment variables load properly

## Problems I Had
- Understanding AI API request structure
- Parsing the returned message content

## Result
✅ The app is ready for a real AI service
✅ The server is set up to handle AI responses
✅ Ready to connect the frontend to AI next week

## Next Week
- Hook the chat input to actual AI replies
- Add error handling for bad responses
- Improve the page style and layout
