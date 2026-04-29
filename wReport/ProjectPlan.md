# Project Plan

## Project Overview
This project is a chatbot web app that started with OpenAI integration and was migrated to Hugging Face and then Ollama for local AI execution. The goal is to build a polished chat interface with saved conversation management, export capability, and a modern responsive UI.

## Feature List
1. AI Chat Backend
   - Local Ollama integration for on-device AI inference
   - Environment-based model selection (`Ollama`)
   - API endpoint for sending user messages and receiving AI responses
2. Chat UI
   - Modern dark theme layout
   - Message bubbles with clear user vs AI styling
   - Scrolling chat history with responsive design
3. Saved Chat Management
   - Save current conversations to browser storage
   - Load saved conversations from a sidebar list
   - Rename saved chats
   - Delete saved chats with confirmation
4. Export and Persistence
   - Export saved chat history as a text file
   - Persist saved chats across browser reloads
   - Include timestamps and sender details in export
5. Usability Enhancements
   - Typing/loading indicator while AI responds
   - Responsive layout for desktop and mobile
   - Clear button labels and improved spacing

## Requirements
### Functional Requirements
- FR1: The app must accept user input and display AI responses in a chat interface.
- FR2: The app must support local Ollama-based AI.
- FR3: Users must be able to save active conversations to local browser storage.
- FR4: Users must be able to load, rename, and delete saved conversations.
- FR5: Export of conversations to a downloadable text file must be available.
- FR6: The UI must be responsive and use a modern dark theme.
- FR7: The app must show a typing/loading indicator while waiting for AI output.

### Non-Functional Requirements
- NFR1: The app should remain fast and responsive on common desktop browsers.
- NFR2: Saved chats must persist across refreshes and browser restarts.
- NFR3: The UI should be easy to read and use on both desktop and small screens.
- NFR4: The app should degrade gracefully if AI backend is unavailable.
- NFR5: Documentation should include weekly reports and a project plan.

## Sprint Breakdown
### Sprint 1: Core AI Chat and UI
#### Goals
- Implement the AI backend connection
- Create the basic chat UI
- Add initial saved chat persistence
- Apply a modern dark theme

#### Milestones
- M1.1: Configure API integration with Ollama
- M1.2: Build chat UI with message bubbles and input field
- M1.3: Implement local storage save/load for conversations
- M1.4: Apply dark theme and responsive layout
- M1.5: Validate chat flow end-to-end

#### Timeline
- Week 1: Setup backend connection and basic message send/receive flow
- Week 2: Build UI and integrate chat rendering
- Week 3: Add save/load chat persistence and test storage
- Week 4: Polish theme, fix layout issues, finalize Sprint 1

### Sprint 2: Saved Chat Management and Export
#### Goals
- Enhance saved chat management
- Add export/download support
- Improve UX and error handling
- Finalize responsive behavior

#### Milestones
- M2.1: Add rename support for saved chats
- M2.2: Add delete confirmation and list updates
- M2.3: Implement export to text file for saved conversations
- M2.4: Add typing indicator and AI response improvements
- M2.5: Final responsive usability polish and bug fixes

#### Timeline
- Week 5: Add rename and delete features for saved chats
- Week 6: Implement export support and validate file output
- Week 7: Improve AI response display, add typing indicator
- Week 8: Final polish, test on multiple screen sizes, wrap up sprint

## Risks and Mitigations
- Risk: AI backend format changes for Ollama.
  - Mitigation: Implement adapter logic and test both response formats.
- Risk: Browser storage limits or inconsistent saved chat persistence.
  - Mitigation: Keep saved data compact and validate storage read/write.
- Risk: Mobile layout may break with long messages.
  - Mitigation: Use wrapping chat bubbles and adaptive component sizing.

## Notes
- The project already has weekly report files through `week_16.md`.
- Future improvements can include conversation search, user authentication, and cloud backup.
