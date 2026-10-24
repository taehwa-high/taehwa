// 모든 페이지 공통 머리말·푸터·게시판 도구
const MENUS = [
  {t:"학교소개", href:"page.html#greet", items:[["학교장 인사말","page.html#greet"],["학교 연혁","page.html#history"],["교가·교표","page.html#symbol"],["오시는 길","page.html#map"]]},
  {t:"학사안내", href:"page.html#cal", items:[["학사일정","page.html#cal"]]},
  {t:"학교생활", href:"page.html#meal", items:[["급식 안내","page.html#meal"],["방과후학교","page.html#after"],["동아리","page.html#club"],["보건·방역 안내","page.html#health"]]},
  {t:"알림마당", href:"notice.html", items:[["공지사항","notice.html"],["가정통신문","letters.html"],["학교 소식","page.html#news"]]},
  {t:"정보공개", href:"page.html#council", items:[["학교운영위원회","page.html#council"],["학교폭력예방","page.html#safe"],["학교 교육계획","page.html#plan"]]}
];
// 교표 이미지 (images/emblem.png 큰 것, images/emblem-160.png 작은 것)
const EMBLEM = '<img class="emb" src="images/emblem-160.png" width="160" height="160" alt="태화여자고등학교 교표">';
const EMBLEM_L = '<img class="emb" src="images/emblem.png" width="640" height="640" alt="태화여자고등학교 교표">';

function header(sec){
  const gnb = MENUS.map(m => '<div class="m' + (m.t === sec ? ' on' : '') + '"><a href="' + m.href + '">' + m.t + '</a><div class="sub">' +
    m.items.map(i => '<a href="' + i[1] + '">' + i[0] + '</a>').join("") + '</div></div>').join("");
  return '<div class="util"><div class="wrap"><div class="l"><a href="#" data-office>교육청</a><a href="#" data-msg="학부모 알림 서비스는 개학 이후 다시 운영합니다.">학부모 알림 서비스</a></div><div class="r"><a href="#" data-msg="개학 준비 기간에는 회원 서비스를 운영하지 않습니다.">로그인</a><a href="#" data-msg="개학 준비 기간에는 회원 서비스를 운영하지 않습니다.">회원가입</a><a href="page.html#sitemap">사이트맵</a></div></div></div>' +
    '<div class="hd-main"><div class="wrap"><a class="logo" href="index.html">' + EMBLEM + '<span><b>태화여자고등학교</b><small>TAEHWA GIRLS\' HIGH SCHOOL</small></span></a>' +
    '<form class="search" id="gsearch"><input aria-label="검색어" placeholder="검색어를 입력하세요"><button>검색</button></form></div></div>' +
    '<nav class="gnb"><div class="wrap">' + gnb + '</div></nav>' +
    '<div class="alert-bar"><div class="wrap"><b>안내</b><a href="letter.html">[전교] 개학 안내 및 참석 회신서 제출 (10월 31일 월요일)</a></div></div>';
}
function footer(){
  return '<footer class="ft"><div class="links"><div class="wrap"><a href="page.html#privacy"><b>개인정보처리방침</b></a><a href="page.html#email">이메일무단수집거부</a><a href="page.html#copyright">저작권 정책</a><a href="page.html#map">찾아오시는 길</a></div></div>' +
    '<div class="wrap in">' + EMBLEM + '<div><p>태화시 태화로 100 태화여자고등학교</p><p>교무실·행정실 대표 전화 연결이 원활하지 않을 수 있습니다.</p><p>Copyright © Taehwa Girls\' High School. All rights reserved.</p></div></div></footer><div class="toast" id="toast"></div>';
}
function lnb(sec, active){
  const m = MENUS.find(x => x.t === sec); if(!m) return '';
  return '<h4>' + m.t + '</h4>' + m.items.map(i => '<a href="' + i[1] + '"' + (i[0] === active ? ' class="on"' : '') + '>' + i[0] + '</a>').join("");
}
let toastT;
function toast(msg){
  const el = document.getElementById('toast'); if(!el) return;
  el.textContent = msg; el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), 2200);
}
function boardRows(items, withBadge){
  const total = items.length;
  return items.map((n, i) => '<tr' + (n.pin ? ' class="pin"' : '') + '><td class="num">' + (n.pin ? '<span class="badge">공지</span>' : (total - i)) + '</td>' +
    '<td class="tl"><a href="' + (n.link || ('view.html#' + n.id)) + '">' + n.t + '</a>' + (n.id === 'l1' ? '<span class="new">N</span>' : '') + '</td>' +
    '<td class="who">' + n.w + '</td><td class="dt">' + n.d + '</td><td class="hit">' + n.h + '</td></tr>').join("");
}
function openOffice(){
  let m = document.getElementById('pwm');
  if(!m){
    m = document.createElement('div'); m.id = 'pwm'; m.className = 'pwm';
    m.innerHTML = '<form class="pwm-box" autocomplete="off"><h4>암호를 입력하세요</h4><p>교직원 전용 페이지입니다.</p>' +
      '<input type="password" id="pwm-in" aria-label="암호" autocomplete="off"><div class="pwm-err" id="pwm-err" role="alert"></div>' +
      '<div class="pwm-btns"><button type="button" class="btn ghost" id="pwm-x">취소</button><button class="btn" id="pwm-ok">확인</button></div></form>';
    document.body.appendChild(m);
    engOnly(m.querySelector('#pwm-in'));
    const close = () => { m.classList.remove('on'); };
    m.addEventListener('click', e => { if(e.target === m) close(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
    m.querySelector('#pwm-x').onclick = close;
    m.querySelector('form').addEventListener('submit', async e => {
      e.preventDefault();
      const pw = toEng(m.querySelector('#pwm-in').value), err = m.querySelector('#pwm-err'), ok = m.querySelector('#pwm-ok');
      if(!pw){ err.textContent = '암호를 입력하세요.'; return; }
      ok.disabled = true; err.textContent = '';
      try{
        await rpc('office_list', {p_password: pw});
        try{ sessionStorage.setItem('th_pw', pw); }catch(x){}
        location.href = 'office.html';
      }catch(x){
        err.textContent = '암호가 맞지 않습니다.'; ok.disabled = false; m.querySelector('#pwm-in').select();
      }
    });
  }
  m.querySelector('#pwm-in').value = ''; m.querySelector('#pwm-err').textContent = '';
  m.classList.add('on'); setTimeout(() => m.querySelector('#pwm-in').focus(), 30);
}
function mount(opts){
  const hd = document.getElementById('hd'); if(hd) hd.innerHTML = header(opts.sec);
  const ft = document.getElementById('ft'); if(ft) ft.innerHTML = footer();
  const l = document.getElementById('lnb'); if(l) l.innerHTML = lnb(opts.sec, opts.active);
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href="#"], [data-msg], [data-office]');
    if(a && a.hasAttribute('data-office')){ e.preventDefault(); openOffice(); return; }
    if(a){ e.preventDefault(); toast(a.dataset.msg || '개학 준비 기간에는 이용할 수 없습니다.'); }
  });
  document.querySelectorAll('form.bsearch').forEach(f => f.addEventListener('submit', e => { e.preventDefault();
    const q = f.querySelector('input').value.trim(), byWho = f.querySelector('select') && f.querySelector('select').selectedIndex === 1; let n = 0;
    document.querySelectorAll('table.list tbody tr').forEach(tr => { const c = tr.querySelector(byWho ? '.who' : '.tl'); const ok = !q || (c && c.textContent.includes(q)); tr.hidden = !ok; if(ok) n++; });
    if(q && !n) toast('검색 결과가 없습니다.'); }));
  // 모바일: 상단 메뉴에 손가락을 대면 PC의 호버처럼 서브 메뉴가 열린다.
  // 그대로 끌어 서브 메뉴 위에서 떼면 그 페이지로 가고, 떼고 나서 서브 메뉴를 눌러도 된다.
  const narrow = window.matchMedia('(max-width:820px)'), gnb = document.querySelector('.gnb');
  const closeAll = () => document.querySelectorAll('.gnb .m.open').forEach(x => x.classList.remove('open'));
  let hot = null;
  const setHot = el => { if(hot === el) return; if(hot) hot.classList.remove('hot'); hot = el; if(hot) hot.classList.add('hot'); };
  if(gnb){
    gnb.addEventListener('touchstart', e => {
      if(!narrow.matches) return; const a = e.target.closest('.m>a'); if(!a) return;
      if(!a.parentElement.classList.contains('open')){ closeAll(); a.parentElement.classList.add('open'); }
    }, {passive:true});
    gnb.addEventListener('touchmove', e => {
      if(!narrow.matches || !e.target.closest('.m>a')) return;
      e.preventDefault();   // 메뉴에서 시작한 손가락은 화면을 스크롤하지 않고 서브 메뉴를 고른다
      const t = e.touches[0], el = document.elementFromPoint(t.clientX, t.clientY);   // 끄는 중에는 다른 메뉴로 바꾸지 않는다 (두 줄 메뉴를 지나갈 때)
      setHot(el && el.closest('.gnb .m.open .sub a'));
    }, {passive:false});
    gnb.addEventListener('touchend', () => { if(hot){ const h = hot.href; setHot(null); location.href = h; } });
    gnb.querySelectorAll('.m>a').forEach(a => a.addEventListener('click', e => { if(narrow.matches) e.preventDefault(); }));
  }
  document.addEventListener('click', e => { if(!e.target.closest('.gnb')) closeAll(); });
  const gs = document.getElementById('gsearch');
  if(gs) gs.addEventListener('submit', e => { e.preventDefault(); const q = gs.querySelector('input').value.trim();
    if(!q){ toast('검색어를 입력하세요.'); return; }
    try{ sessionStorage.setItem('thq', q); }catch(err){}
    if(/page\.html$/.test(location.pathname) && location.hash === '#search') location.reload(); else location.href = 'page.html#search'; });
}
