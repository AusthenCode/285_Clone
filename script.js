async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");

  const userMessage = input.value;
  chat.innerHTML += "<p><b>You:</b> " + userMessage + "</p>";

  const response = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await response.json();
  chat.innerHTML += "<p><b>Bot:</b> " + data.reply + "</p>";

  input.value = "";
}