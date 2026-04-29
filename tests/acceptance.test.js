/**
 * @jest-environment jsdom
 */

const { appendMessage, saveChat, loadSavedChats, loadChat, chatHistory } = require('../script.js');

describe('Acceptance tests for chat save/load behavior', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="chat"></div>
      <div id="savedChatsList"></div>
      <button id="saveBtn"></button>
      <button id="clearBtn"></button>
      <input id="userInput" />
      <div id="spinner" class="hidden"></div>
    `;
    chatHistory.length = 0;
    localStorage.clear();
    window.alert = jest.fn();
    window.confirm = jest.fn().mockReturnValue(true);
    window.prompt = jest.fn().mockReturnValue('Renamed Chat');
  });

  test('saveChat persists current chat and loadSavedChats renders a saved item', () => {
    appendMessage('user', 'Hello test');
    saveChat();

    const savedChats = JSON.parse(localStorage.getItem('savedChats'));
    expect(savedChats).not.toBeNull();
    expect(Object.keys(savedChats).length).toBe(1);

    loadSavedChats();
    expect(document.getElementById('savedChatsList').textContent).toContain('Chat');
  });

  test('loadChat repopulates chat window from saved conversation', () => {
    appendMessage('user', 'Saved message');
    saveChat();
    const savedChats = JSON.parse(localStorage.getItem('savedChats'));
    const timestamp = Object.keys(savedChats)[0];

    document.getElementById('chat').innerHTML = '';
    chatHistory.length = 0;

    loadChat(timestamp);
    expect(document.getElementById('chat').textContent).toContain('Saved message');
    expect(chatHistory.length).toBeGreaterThan(0);
  });
});