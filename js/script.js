/* --- Navigation --- */
document.addEventListener('DOMContentLoaded', function(){
  const navLinks = document.querySelectorAll('nav.main a.nav-link');
  function setActive(id){
    document.querySelectorAll('main section').forEach(s => s.style.display = 'none');
    const el = document.getElementById(id);
    if(el) el.style.display = 'block';
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === id));
    window.scrollTo({top:0, behavior:'smooth'});
  }
  navLinks.forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.dataset.section;
      setActive(id);
    });
  });
  setActive('home');
});

/* --- Criteria data --- */
const criteriaData = {
  ufl:{
    title:"Cấp Trường Đại học Ngoại ngữ, ĐHĐN",
    html:`
      <h4>Đạo đức</h4>
      <ul>
        <li>Không vi phạm pháp luật và các quy chế, nội quy của nhà trường, quy định của địa phương và cộng đồng.</li>
        <li>Đạt thêm 01 trong các tiêu chí sau:
          <ul>
            <li>Điểm rèn luyện trung bình HKI 2023-2024 đạt từ 85 điểm trở lên (thang 100 theo quy chế Bộ GD&ĐT).</li>
            <li>Điểm rèn luyện trung bình HKI 2023-2024 đạt từ 80 điểm trở lên (áp dụng cho sinh viên có minh chứng tham gia ít nhất 01 hoạt động chính trị - tư tưởng: học tập, sinh hoạt, thi tìm hiểu nghị quyết, tư tưởng Hồ Chí Minh).</li>
          </ul>
        </li>
      </ul>

      <h4>Học tập</h4>
      <p>Điểm trung bình học tập năm học 2023-2024 đạt từ 3.2/4.0 trở lên.</p>

      <h4>Thể lực</h4>
      <p>Đạt 01 trong các tiêu chí sau:</p>
      <ul>
        <li>Điểm trung bình môn Thể dục trong năm học 2023-2024 đạt loại khá trở lên.</li>
        <li>Tham gia và có giấy chứng nhận phong trào/hoạt động thể thao cấp CLB, Liên Chi hội, Liên Chi đoàn trở lên.</li>
        <li>Là thành viên đội tuyển hoặc cá nhân tham gia thi đấu hội thao / giải thể thao cấp Trường trở lên.</li>
        <li>Tham gia rèn luyện thể thao định kỳ tại CLB/Đội/Nhóm trong Trường.</li>
        <li>Tham gia và có chứng nhận chương trình teambuilding do CLB hoặc Đoàn – Hội Nhà trường tổ chức.</li>
      </ul>

      <h4>Tình nguyện</h4>
      <p>Đạt 01 trong các tiêu chuẩn sau:</p>
      <ul>
        <li>Có chứng nhận hoàn thành một trong các chiến dịch: Tình nguyện hè, Tình nguyện Đông – Xuân.</li>
        <li>Đạt 01 chứng nhận tham gia hoạt động tình nguyện tại chỗ (CLB, Liên Chi hội, Liên Chi đoàn trở lên hoặc đơn vị ngoài Trường).</li>
        <li>Được giấy khen cấp Trường, Đoàn Trường trở lên về hoạt động tình nguyện.</li>
      </ul>

      <h4>Hội nhập</h4>
      <p>Đạt 01 trong các tiêu chí sau:</p>
      <ul>
        <li>Tham gia ít nhất 01 hoạt động hội nhập giao lưu quốc tế, hội thảo quốc gia/quốc tế.</li>
        <li>Đạt chứng chỉ ngoại ngữ 2 trình độ A2 hoặc tương đương (đối với SV chuyên ngữ). 
            Đạt chứng chỉ ngoại ngữ B1 tiếng Anh hoặc tương đương (đối với SV không chuyên ngữ). 
            (Áp dụng quy đổi theo Thông tư 05/2012/TT-BGDĐT).</li>
        <li>Tham gia và đạt giải trong các cuộc thi ngoại ngữ cấp Liên Chi Đoàn, Liên Chi hội, Khoa, CLB trở lên.</li>
      </ul>
    `
  },
  udn:{title:"Cấp Đại học Đà Nẵng", html:"<p>Tiêu chí sẽ được cập nhật.</p>"},
  danang:{title:"Cấp Thành phố Đà Nẵng", html:"<p>Tiêu chí sẽ được cập nhật.</p>"},
  central:{title:"Cấp Trung ương", html:"<p>Tiêu chí sẽ được cập nhật.</p>"}
};

/* --- News detail --- */
function openNews(id){
  const detail = document.getElementById('newsDetail');
  if(id===1){
    detail.innerHTML = `<h3>Chúc mừng SV đạt SV5T cấp Trung ương</h3><p>Nội dung chi tiết ...</p>`;
  } else {
    detail.innerHTML = `<h3>Những thành tích tiêu biểu</h3><p>Nội dung chi tiết ...</p>`;
  }
  detail.style.display = 'block';
  detail.scrollIntoView({behavior:'smooth'});
}
window.openNews = openNews;

/* --- Chatbot --- */
(function(){
  const chatWindow = document.getElementById('chatWindow');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  let awaitingCriterionChoice = false;

  function addMsg(text, sender='bot'){
    const div = document.createElement('div');
    div.className = 'chat-msg ' + (sender==='user' ? 'chat-user' : 'chat-bot');
    div.textContent = (sender==='user' ? '👤 ' : '🤖 ') + text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  function normalize(s){ return s.toLowerCase().trim(); }

  function botReply(raw){
    const msg = normalize(raw);
    if(msg.includes('xin chào sv5t')){
      addMsg('Cảm ơn bạn đã đến với Website Tư vấn Sinh viên 5 tốt, bạn muốn hỏi gì về Danh hiệu Sinh viên 5 tốt?');
      awaitingCriterionChoice = false; return;
    }
    if(msg.includes('là gì')){
      addMsg('Danh hiệu "Sinh viên 5 tốt" là một danh hiệu cao quý...');
      return;
    }
    if(msg.includes('xét') && msg.includes('cấp trường')){
      addMsg('Bạn muốn hỏi về tiêu chí nào: Học tập, Đạo đức, Thể lực, Tình nguyện, Hội nhập?');
      awaitingCriterionChoice = true; return;
    }
    if(awaitingCriterionChoice){
      if(msg.includes('đạo')){ addMsg('Đạo đức: Không vi phạm + điểm rèn luyện ≥85 hoặc ≥80 + HĐ chính trị.'); return; }
      if(msg.includes('học')){ addMsg('Học tập: GPA ≥3.2/4.0.'); return; }
      if(msg.includes('thể')){ addMsg('Thể lực: TB môn Thể dục khá trở lên hoặc chứng nhận thể thao.'); return; }
      if(msg.includes('tình')){ addMsg('Tình nguyện: Có giấy chứng nhận chiến dịch tình nguyện.'); return; }
      if(msg.includes('hội')){ addMsg('Hội nhập: Tham gia giao lưu quốc tế hoặc có chứng chỉ ngoại ngữ A2/B1.'); return; }
    }
    if(msg.includes('giấy') || msg.includes('chứng nhận')){
      if(msg.includes('tình nguyện')){ addMsg('Minh chứng hợp lệ cho tiêu chí Tình nguyện.'); return; }
      if(msg.includes('thể')){ addMsg('Minh chứng hợp lệ cho tiêu chí Thể lực.'); return; }
      if(msg.includes('ngoại ngữ') || msg.includes('ielts')){ addMsg('Minh chứng hợp lệ cho tiêu chí Hội nhập.'); return; }
      addMsg('Minh chứng chưa hợp lệ, bạn có minh chứng khác không?'); return;
    }
    addMsg('Tôi sẽ cập nhật lại thông tin. Bạn có thể truy cập fanpage để biết thêm chi tiết nhé!');
  }

  sendBtn.addEventListener('click', ()=>{
    const v = chatInput.value.trim();
    if(!v) return;
    addMsg(v, 'user');
    chatInput.value = '';
    botReply(v);
  });
  chatInput.addEventListener('keypress', e=>{
    if(e.key==='Enter'){ sendBtn.click(); }
  });
})();
