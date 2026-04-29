/**
 * @jest-environment jsdom
 */

const { escapeHtml, appendMessage, chatHistory } = require('../script.js');

describe('Unit tests for chat utilities', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="chat"></div>';
    chatHistory.length = 0;
    window.alert = jest.fn();
    window.confirm = jest.fn();
    window.prompt = jest.fn();
    localStorage.clear();
  });

  test('escapeHtml should sanitize HTML characters', () => {
    expect(escapeHtml('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(escapeHtml('a & b > c < d "\'')).toContain('&amp;');
  });

  test('appendMessage should add a message element and update chatHistory', () => {
    appendMessage('user', 'Hello <b>world</b>');
    const chat = document.getElementById('chat');

    expect(chat.children.length).toBe(1);
    expect(chatHistory.length).toBe(1);
    expect(chatHistory[0].text).toBe('Hello <b>world</b>');
    expect(chat.textContent).toContain('You');
    expect(chat.textContent).toContain('Hello <b>world</b>');
  });
});