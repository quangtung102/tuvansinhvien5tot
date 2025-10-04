function toggleChat() {
  const body = document.getElementById("chatbotBody");
  body.style.display = body.style.display === "flex" ? "none" : "flex";
}

function handleKey(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  const messages = document.getElementById("messages");

  // Hiển thị tin nhắn người dùng
  const userMsg = document.createElement("div");
  userMsg.textContent = "👤: " + msg;
  messages.appendChild(userMsg);

  // Trả lời giả lập
  const botMsg = document.createElement("div");
  botMsg.textContent = "🤖: Cảm ơn bạn đã hỏi về '" + msg + "'. Hãy liên hệ ĐTN – HSV để được hướng dẫn chi tiết hơn.";
  messages.appendChild(botMsg);

  input.value = "";
  messages.scrollTop = messages.scrollHeight;
}
