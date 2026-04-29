/**
 * @jest-environment jsdom
 */

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const request = require('supertest');
const app = require('../server');
const { sendMessage, chatHistory } = require('../script.js');

describe('Integration tests for server and client flow', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="chat"></div>
      <div id="savedChatsList"></div>
      <input id="userInput" />
      <div id="spinner" class="hidden"></div>
      <button id="sendBtn"></button>
      <button id="saveBtn"></button>
      <button id="clearBtn"></button>
    `;
    chatHistory.length = 0;
    localStorage.clear();
    window.alert = jest.fn();
    window.confirm = jest.fn().mockReturnValue(true);
    window.prompt = jest.fn().mockReturnValue('Renamed Chat');
  });

  afterEach(() => {
    global.fetch = undefined;
  });

  test('POST /chat returns a streamed Ollama-style reply', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      body: {
        getReader: () => {
          const chunks = [
            new TextEncoder().encode(JSON.stringify({ response: 'Hello '})),
            new TextEncoder().encode(JSON.stringify({ response: 'world', done: true }))
          ];
          let index = 0;
          return {
            read: jest.fn().mockImplementation(() => {
              if (index < chunks.length) {
                return Promise.resolve({ value: chunks[index++], done: false });
              }
              return Promise.resolve({ value: undefined, done: true });
            })
          };
        }
      }
    }));

    const res = await request(app).post('/chat').send({ message: 'hi' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ reply: 'Hello world' });
  });

  test('sendMessage appends both user and bot messages and hides spinner', async () => {
    document.getElementById('userInput').value = 'Hi there';
    const spinner = document.getElementById('spinner');
    spinner.classList.add('hidden');

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ reply: 'Bot answer' })
    }));

    await sendMessage();

    const chatText = document.getElementById('chat').textContent;
    expect(chatText).toContain('You');
    expect(chatText).toContain('Bot answer');
    expect(spinner.classList.contains('hidden')).toBe(true);
  });
});