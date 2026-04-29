function escapeHtml(unsafe) {
  return unsafe
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

const chatHistory = [];

function appendMessage(sender, text) {
  const chat = document.getElementById('chat');
  const msg = document.createElement('div');
  msg.className = 'message ' + sender;

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = sender === 'user' ? 'You' : 'Bot';

  const content = document.createElement('div');
  content.className = 'content';
  const textDiv = document.createElement('div');
  textDiv.className = 'text';
  const normalized = text.replace(/\s+/g, ' ').trim();
  textDiv.innerHTML = escapeHtml(normalized);
  const timeDiv = document.createElement('div');
  timeDiv.className = 'time';
  const timestamp = new Date();
  timeDiv.textContent = timestamp.toLocaleTimeString();

  content.appendChild(textDiv);
  content.appendChild(timeDiv);
  msg.appendChild(avatar);
  msg.appendChild(content);

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;

  chatHistory.push({ sender, text: normalized, time: timestamp.toLocaleTimeString() });
}

function saveChat() {
  if (chatHistory.length === 0) {
    alert('No chat history to save.');
    return;
  }

  const timestamp = new Date().toISOString();
  const shortTitle = `Chat ${new Date().toLocaleDateString()}`;
  const saved = {
    title: shortTitle,
    timestamp,
    messages: chatHistory
  };

  const savedChats = JSON.parse(localStorage.getItem('savedChats') || '{}');
  savedChats[timestamp] = saved;
  localStorage.setItem('savedChats', JSON.stringify(savedChats));
  
  alert(`Chat saved as "${shortTitle}"`);
  loadSavedChats();
}

function loadSavedChats() {
  const savedChats = JSON.parse(localStorage.getItem('savedChats') || '{}');
  const list = document.getElementById('savedChatsList');
  list.innerHTML = '';

  const timestamps = Object.keys(savedChats).sort().reverse();
  if (timestamps.length === 0) {
    list.innerHTML = '<p style="color: var(--muted);">No saved chats yet.</p>';
    return;
  }

  timestamps.forEach(ts => {
    const chat = savedChats[ts];
    const item = document.createElement('div');
    item.className = 'saved-chat-item';
    item.innerHTML = `
      <div class="saved-chat-info">
        <strong>${chat.title}</strong>
        <span class="saved-chat-date">${new Date(ts).toLocaleDateString()}</span>
      </div>
      <div class="saved-chat-actions">
        <button class="saved-chat-btn load-btn" data-timestamp="${ts}">Load</button>
        <button class="saved-chat-btn rename-btn" data-timestamp="${ts}">Rename</button>
        <button class="saved-chat-btn delete-btn" data-timestamp="${ts}">Delete</button>
      </div>
    `;
    list.appendChild(item);
  });

  document.querySelectorAll('.load-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const ts = e.target.dataset.timestamp;
      loadChat(ts);
    });
  });

  document.querySelectorAll('.rename-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const ts = e.target.dataset.timestamp;
      renameChat(ts);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const ts = e.target.dataset.timestamp;
      deleteChat(ts);
    });
  });
}

function loadChat(timestamp) {
  const savedChats = JSON.parse(localStorage.getItem('savedChats') || '{}');
  const chat = savedChats[timestamp];
  if (!chat) return;

  const chatWindow = document.getElementById('chat');
  chatWindow.innerHTML = '';
  chatHistory.length = 0;

  chat.messages.forEach(entry => {
    appendMessage(entry.sender, entry.text);
  });
}

function renameChat(timestamp) {
  const savedChats = JSON.parse(localStorage.getItem('savedChats') || '{}');
  const chat = savedChats[timestamp];
  if (!chat) return;

  const newName = prompt('Enter new chat name:', chat.title);
  if (newName === null || newName.trim() === '') return;

  chat.title = newName.trim();
  savedChats[timestamp] = chat;
  localStorage.setItem('savedChats', JSON.stringify(savedChats));
  loadSavedChats();
}

function deleteChat(timestamp) {
  if (!confirm('Delete this chat?')) return;
  
  const savedChats = JSON.parse(localStorage.getItem('savedChats') || '{}');
  delete savedChats[timestamp];
  localStorage.setItem('savedChats', JSON.stringify(savedChats));
  loadSavedChats();
}

async function sendMessage() {
  const input = document.getElementById('userInput');
  const spinner = document.getElementById('spinner');
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';
  spinner.classList.remove('hidden');

  try {
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    appendMessage('bot', data.reply || 'No reply');
  } catch (err) {
    appendMessage('bot', 'Error: could not reach server');
    console.error(err);
  } finally {
    spinner.classList.add('hidden');
  }
}

function setup() {
  const sendBtn = document.getElementById('sendBtn');
  const input = document.getElementById('userInput');
  const clearBtn = document.getElementById('clearBtn');
  const saveBtn = document.getElementById('saveBtn');

  sendBtn.addEventListener('click', sendMessage);
  saveBtn.addEventListener('click', saveChat);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  clearBtn.addEventListener('click', () => {
    const chat = document.getElementById('chat');
    chat.innerHTML = '';
    chatHistory.length = 0;
  });

  loadSavedChats();
}

document.addEventListener('DOMContentLoaded', setup);

const exportedScript = {
  escapeHtml,
  appendMessage,
  saveChat,
  loadSavedChats,
  loadChat,
  renameChat,
  deleteChat,
  sendMessage,
  setup,
  chatHistory
};

if (typeof globalThis !== 'undefined') {
  Object.assign(globalThis, exportedScript);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = exportedScript;
}
