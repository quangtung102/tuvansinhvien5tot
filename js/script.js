// Navigation: bật/tắt section khi click menu
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  function showSection(id) {
    // ẩn hết
    sections.forEach(s => s.classList.remove('active-section'));
    // active section
    const sec = document.getElementById(id);
    if (sec) sec.classList.add('active-section');
    // active menu
    links.forEach(a => a.classList.toggle('active', a.dataset.section === id));
    // focus main
    const main = document.getElementById('mainContent');
    if (main) main.focus();
  }

  // bind click
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.dataset.section;
      showSection(id);
      // scroll to top of main
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // mở mặc định trang chủ
  showSection('home');
});

// --- Bộ tiêu chí ---
const criteriaData = {
  ufl: {
    title: "Cấp Trường ĐH Ngoại ngữ, ĐHĐN",
    content: `
    <h3>Đạo đức</h3>
    <ul>
      <li>Không vi phạm pháp luật, nội quy trường, quy định địa phương.</li>
      <li>Thêm 1 trong 2 điều kiện:
        <ul>
          <li>Điểm rèn luyện HKI 2023-2024 ≥ 85/100</li>
          <li>Điểm rèn luyện HKI ≥ 80/100 + minh chứng tham gia hoạt động chính trị - tư tưởng</li>
        </ul>
      </li>
    </ul>
    <h3>Học tập</h3>
    <p>Điểm TB năm học 2023-2024 ≥ 3.2/4.0</p>
    <h3>Thể lực</h3>
    <ul>
      <li>Điểm TB môn Thể dục đạt loại khá trở lên</li>
      <li>Hoặc có chứng nhận tham gia hoạt động thể thao/đội tuyển/teambuilding…</li>
    </ul>
    <h3>Tình nguyện</h3>
    <ul>
      <li>Giấy chứng nhận hoàn thành Chiến dịch TN Hè / Đông - Xuân</li>
      <li>Hoặc giấy chứng nhận TN tại chỗ (CLB/LCĐ…)</li>
      <li>Hoặc giấy khen cấp Trường/Đoàn Trường về TN</li>
    </ul>
    <h3>Hội nhập</h3>
    <ul>
      <li>Tham gia ≥1 hoạt động giao lưu quốc tế / hội thảo</li>
      <li>Hoặc đạt chứng chỉ NN: A2 (chuyên ngữ) hoặc B1 Anh (không chuyên ngữ), tương đương</li>
      <li>Hoặc đạt giải thi ngoại ngữ từ cấp LCĐ trở lên</li>
    </ul>`
  },
  udn: { title:"Cấp ĐH Đà Nẵng", content:"<p>Tiêu chí cấp ĐH Đà Nẵng sẽ được cập nhật.</p>" },
  danang: { title:"Cấp Thành phố Đà Nẵng", content:"<p>Tiêu chí cấp Thành phố sẽ được cập nhật.</p>" },
  central: { title:"Cấp Trung ương", content:"<p>Tiêu chí cấp Trung ương sẽ được cập nhật.</p>" }
};

document.querySelectorAll(".level-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const lvl = btn.dataset.level;
    const data = criteriaData[lvl];
    document.getElementById("criteriaContent").innerHTML =
      `<h3>${data.title}</h3>${data.content}`;
  });
});

// --- Chatbot mô phỏng ---
const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

function addMsg(text, sender="bot") {
  const div = document.createElement("div");
  div.className = "chat-msg " + (sender==="user"?"chat-user":"chat-bot");
  div.textContent = (sender==="user"?"👤 ":"🤖 ") + text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// kịch bản tư vấn
function botReply(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("xin chào")) {
    addMsg("Cảm ơn bạn đã đến với Website Tư vấn Sinh viên 5 tốt, bạn muốn hỏi gì về Danh hiệu Sinh viên 5 tốt?");
  } 
  else if (msg.includes("là gì")) {
    addMsg("Danh hiệu 'Sinh viên 5 tốt' là danh hiệu cao quý do Trung ương HSV VN phát động, với 5 tiêu chí: Học tập tốt – Đạo đức tốt – Thể lực tốt – Tình nguyện tốt – Hội nhập tốt.");
  } 
  else if (msg.includes("tiêu chí nào")) {
    addMsg("Bạn muốn hỏi về tiêu chí nào trước: Học tập, Đạo đức, Thể lực, Tình nguyện hay Hội nhập?");
  } 
  else if (msg.includes("đạo đức")) {
    addMsg("Đạo đức: Không vi phạm pháp luật; Điểm RL HKI 2023-2024 ≥85 hoặc ≥80 kèm minh chứng chính trị - tư tưởng.");
  } 
  else if (msg.includes("học tập")) {
    addMsg("Học tập: Điểm trung bình năm học 2023-2024 ≥ 3.2/4.0.");
  } 
  else if (msg.includes("thể lực")) {
    addMsg("Thể lực: Đạt TB môn TD khá trở lên, hoặc có chứng nhận tham gia hoạt động/thi đấu thể thao/teambuilding.");
  } 
  else if (msg.includes("tình nguyện")) {
    addMsg("Tình nguyện: Có chứng nhận hoàn thành chiến dịch TN Hè/Đông-Xuân, hoặc giấy chứng nhận TN tại chỗ, hoặc giấy khen cấp Trường/Đoàn Trường.");
  } 
  else if (msg.includes("hội nhập")) {
    addMsg("Hội nhập: Tham gia hoạt động giao lưu quốc tế/hội thảo; hoặc đạt chứng chỉ NN A2/B1 hoặc tương đương; hoặc đạt giải thi ngoại ngữ.");
  }
  else if (msg.includes("giấy") || msg.includes("chứng nhận") || msg.includes("bằng khen")) {
    // phán đoán minh chứng
    if (msg.includes("tình nguyện")) {
      addMsg("Minh chứng của bạn là hợp lệ cho tiêu chí Tình nguyện.");
    } else if (msg.includes("thể thao") || msg.includes("thể lực")) {
      addMsg("Minh chứng của bạn là hợp lệ cho tiêu chí Thể lực.");
    } else if (msg.includes("ngoại ngữ") || msg.includes("hội nhập")) {
      addMsg("Minh chứng của bạn là hợp lệ cho tiêu chí Hội nhập.");
    } else {
      addMsg("Minh chứng của bạn chưa hợp lệ, bạn có minh chứng nào khác không?");
    }
  }
  else {
    addMsg("Tôi sẽ cập nhật lại thông tin. Bạn có thể truy cập fanpage “Đoàn TN – HSV Trường ĐHNN, ĐHĐN” hoặc CLB SV5T để biết thêm chi tiết nhé!");
  }
}

// gửi tin nhắn
function sendMsg() {
  const msg = chatInput.value.trim();
  if (!msg) return;
  addMsg(msg, "user");
  chatInput.value = "";
  botReply(msg);
}
sendBtn.addEventListener("click", sendMsg);
chatInput.addEventListener("keypress", e => {
  if (e.key==="Enter") sendMsg();
});
