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
  ufl:{ title:"Cấp Trường Đại học Ngoại ngữ, ĐHĐN", html:`…` },
  udn:{title:"Cấp Đại học Đà Nẵng", html:"<p>Tiêu chí sẽ được cập nhật.</p>"},
  danang:{title:"Cấp Thành phố Đà Nẵng", html:"<p>Tiêu chí sẽ được cập nhật.</p>"},
  central:{title:"Cấp Trung ương", html:"<p>Tiêu chí sẽ được cập nhật.</p>"}
};
document.querySelectorAll('.level-btn').forEach(btn=>{
  btn.addEventListener('click', function(){
    const lvl = this.dataset.level;
    const data = criteriaData[lvl];
    document.getElementById('criteriaContent').innerHTML = `<h3>${data.title}</h3>` + data.html;
  });
});

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
