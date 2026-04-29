# Week 2 Report: Chat Interface and Server Connection

## What I Did
I built the chat interface and connected the front end to the back-end server.

## What I Changed
- Added input box and send button to `index.html`
- Updated `script.js` to send messages to the server
- Created a POST `/chat` endpoint in `server.js`
- Added CORS and JSON support to the Express server

## Why This Matters
The chat interface is the main way users interact with the app. Connecting it to the server makes it possible to send and receive messages.

## What I Tested
✅ Sending a message triggers a server request
✅ Server receives chat data
✅ No CORS errors in the browser

## Problems I Had
- Getting the request format right
- Handling empty input safely

## Result
✅ Basic chat send flow works
✅ The front end and back end are talking
✅ Ready to add smart responses next week

## Next Week
- Add placeholder bot responses
- Improve chat rendering
- Start saving chats locally
