/**
 * @jest-environment jsdom
 */

const { saveChat, loadSavedChats, chatHistory } = require('../script.js');

describe('Regression tests for saved chat behavior', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="chat"></div>
      <div id="savedChatsList"></div>
      <button id="saveBtn"></button>
    `;
    chatHistory.length = 0;
    localStorage.clear();
    window.alert = jest.fn();
  });

  test('saveChat does not create storage when no chat history exists', () => {
    saveChat();
    expect(localStorage.getItem('savedChats')).toBeNull();
    expect(window.alert).toHaveBeenCalledWith('No chat history to save.');
  });

  test('loadSavedChats shows placeholder when there are no saved chats', () => {
    loadSavedChats();
    expect(document.getElementById('savedChatsList').textContent).toContain('No saved chats yet.');
  });
});