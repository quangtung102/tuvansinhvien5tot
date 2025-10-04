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

/* --- Modal Bộ tiêu chí --- */
(function() {
  const btn = document.getElementById('criteriaBtn');
  const modal = document.getElementById('criteriaModal');
  const closeBtn = document.getElementById('closeCriteria');

  if (!btn || !modal) return;

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    // disable body scroll khi modal mở
    document.body.style.overflow = 'hidden';
    // focus vào modal để support bàn phím
    modal.querySelector('.modal-content').focus();
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    // trả focus về nút
    btn.focus();
  }

  btn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  // đóng khi click nền mờ
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });

  // đóng khi nhấn Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
})();
