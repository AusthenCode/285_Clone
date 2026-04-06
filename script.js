function escapeHtml(unsafe) {
  return unsafe
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

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
  textDiv.innerHTML = escapeHtml(text).replace(/\n/g, '<br>');
  const timeDiv = document.createElement('div');
  timeDiv.className = 'time';
  timeDiv.textContent = new Date().toLocaleTimeString();

  content.appendChild(textDiv);
  content.appendChild(timeDiv);
  msg.appendChild(avatar);
  msg.appendChild(content);

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
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

  sendBtn.addEventListener('click', sendMessage);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  clearBtn.addEventListener('click', () => {
    const chat = document.getElementById('chat');
    chat.innerHTML = '';
  });
}

document.addEventListener('DOMContentLoaded', setup);