// 하위 메뉴 페이지 내용 (page.html#아이디 로 열림)
function calMonth(y, m, ev){ // m: 1~12, ev: {일: ['class','설명']}
  const first = new Date(y, m-1, 1).getDay(), last = new Date(y, m, 0).getDate();
  let h = '<table class="mcal"><thead><tr><th class="sun">일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th class="sat">토</th></tr></thead><tbody><tr>';
  for(let i=0;i<first;i++) h += '<td></td>';
  for(let d=1; d<=last; d++){
    const w = (first + d - 1) % 7, e = ev[d];
    if(w===0 && d>1) h += '</tr><tr>';
    h += '<td class="' + (w===0?'sun ':'') + (w===6?'sat ':'') + (e?e[0]:'') + '"><b>' + d + '</b>' + (e && e[1] ? '<span>' + e[1] + '</span>' : '') + '</td>';
  }
  return h + '</tr></tbody></table>';
}

const PAGES = {
greet: {sec:"학교소개", t:"학교장 인사말", html:`
<div class="greet-pg"><div class="gp-em" data-emblem></div><div>
<p class="lead">"다시, 교실로."</p>
<p>길고 어려운 시간을 지나 태화시에 다시 일상이 찾아왔습니다. 그동안 학교를 지켜 주신 학부모님과 지역 주민 여러분께 깊이 감사드립니다.</p>
<p>태화여자고등학교는 1971년 개교 이래 '참되고, 바르고, 아름다운 사람'을 길러 온 학교입니다. 올해 봄, 우리는 예상하지 못한 일로 교문을 닫아야 했고, 학생들은 각자의 자리에서 그 시간을 견뎌 냈습니다.</p>
<p>이제 교직원 모두가 학생들이 안전하게 돌아올 수 있도록 교실을 정비하고 있습니다. 정문에는 검역 게이트를 새로 설치하였고, 본관 현관에는 출입 명부를 비치하였습니다. 처음 며칠은 낯설고 불편하시겠지만, 모두의 안전을 위한 일이니 너그러이 협조해 주시기 바랍니다.</p>
<p>10월 31일, 태화여고가 다시 개화합니다. 빈 책상 없이 다시 만날 수 있기를 바랍니다.</p>
<p class="sign">2033년 10월<br><b>태화여자고등학교장</b></p></div></div>`},

history: {sec:"학교소개", t:"학교 연혁", html:`
<p class="desc">1971년 개교 이후 태화여자고등학교가 걸어온 길입니다.</p>
<ol class="hist">
<li><b>2033. 10. 31.</b><span>개학 <em>예정</em></span></li>
<li><b>2033. 10. 26.</b><span>개학 준비 기간 운영 (교직원 출입 재개)</span></li>
<li><b>2033. 10. 24.</b><span>정문 검역 게이트 설치 완료</span></li>
<li><b>2033. 07. 01.</b><span>국가 감염병 재난 사태에 따른 휴업</span></li>
<li><b>2033. 03. 02.</b><span>제63회 입학식 (신입생 248명)</span></li>
<li><b>2033. 02. 10.</b><span>제60회 졸업식 (졸업생 2만 1,436명 배출)</span></li>
<li><b>2024. 03. 01.</b><span>고교학점제 연구학교 지정</span></li>
<li><b>1998. 11. 20.</b><span>체육관(태화관) 준공</span></li>
<li><b>1985. 08. 30.</b><span>본관 신축 이전 (태화시 태화로 100)</span></li>
<li><b>1974. 02. 15.</b><span>제1회 졸업식 (졸업생 312명)</span></li>
<li><b>1971. 03. 05.</b><span>태화여자고등학교 개교 (6학급), 초대 교장 취임</span></li>
</ol>`},

symbol: {sec:"학교소개", t:"교가·교표", html:`
<h3 class="sub">교표</h3>
<div class="sym"><div class="sym-em" data-emblem></div><div>
<p>둥근 녹색 테두리는 학생을 품에 안은 학교를, 금빛 두 줄은 끝없이 이어지는 배움을 뜻하며, 양옆의 별은 어둠 속에서도 길을 밝혀 주는 스승과 벗을 상징합니다.</p>
<p>가운데의 <b>목련 봉오리</b>는 본교의 교화로, 이른 봄 가장 먼저 피어나는 맑은 마음과 교훈 '참되고, 바르고, 아름답게'가 꽃피는 모습을 나타냅니다. 그 아래에서 봉오리를 받쳐 올리는 <b>두 잎</b>은 학생을 함께 길러 내는 학교와 가정입니다.</p>
<p class="muted small">교표는 태화 녹색과 목련 금색 두 가지 색만 씁니다.</p></div></div>
<table class="tbl"><tbody>
<tr><th>교훈</th><td>참되고, 바르고, 아름답게</td></tr>
<tr><th>교목</th><td>은행나무 — 오래도록 곧게 자라는 꿋꿋함</td></tr>
<tr><th>교화</th><td>목련 — 이른 봄 가장 먼저 피어나는 맑은 마음</td></tr>
<tr><th>상징색</th><td><i class="sw" style="background:#1f4e3d"></i>태화 녹색 &nbsp; <i class="sw" style="background:#c9a24b"></i>목련 금색</td></tr>
</tbody></table>
<h3 class="sub">교가</h3>
<div class="song"><p class="cr">작사 남궁녹차 · 작곡 제갈파도</p>
<div class="vs"><b>1절</b><p>태화산 푸른 기슭 은행잎 곱게 물들면<br>맑은 꿈 품에 안고 우리 여기 모였네<br>참되고 바르게 아름답게 살리라<br>빛나라 태화여고 영원한 우리 교정</p></div>
<div class="vs"><b>2절</b><p>목련꽃 피는 아침 종소리 멀리 퍼지면<br>손잡고 함께 걸어 배움의 길 가리라<br>정성과 어울림 가슴 깊이 새기며<br>빛나라 태화여고 영원한 우리 교정</p></div></div>`},

map: {sec:"학교소개", t:"오시는 길", html:`
<div class="mapbox"><svg viewBox="0 0 640 320" role="img" aria-label="태화여자고등학교 약도">
<rect width="640" height="320" fill="#eef1ee"/>
<rect x="0" y="236" width="640" height="34" fill="#fff" stroke="#cfd6d1"/><text x="20" y="258" font-size="13" fill="#777">태화로</text>
<rect x="470" y="0" width="30" height="236" fill="#fff" stroke="#cfd6d1"/><text x="484" y="40" font-size="13" fill="#777" transform="rotate(90 484 40)">은행나무길</text>
<rect x="110" y="40" width="330" height="190" fill="#dfe9e2" stroke="#1f4e3d" stroke-width="1.5" stroke-dasharray="5 4"/>
<rect x="150" y="62" width="200" height="46" fill="#1f4e3d"/><text x="250" y="90" font-size="14" fill="#fff" text-anchor="middle">본관</text>
<rect x="370" y="62" width="54" height="80" fill="#5f7d6f"/><text x="397" y="106" font-size="12" fill="#fff" text-anchor="middle">태화관</text>
<rect x="150" y="128" width="200" height="80" rx="40" fill="#f6f8f6" stroke="#9fb3a7"/><text x="250" y="173" font-size="13" fill="#6b7f73" text-anchor="middle">운동장</text>
<rect x="262" y="222" width="46" height="16" fill="#c9a24b"/><text x="285" y="296" font-size="13" fill="#1f4e3d" text-anchor="middle" font-weight="700">정문 (검역 게이트)</text>
<line x1="285" y1="238" x2="285" y2="280" stroke="#c9a24b" stroke-width="1.5"/>
<circle cx="560" cy="253" r="9" fill="#2f6db5"/><text x="560" y="257" font-size="10" fill="#fff" text-anchor="middle">B</text><text x="560" y="292" font-size="12" fill="#2f6db5" text-anchor="middle">태화여고 정류장</text>
<text x="120" y="32" font-size="12" fill="#1f4e3d">태화여자고등학교</text>
</svg></div>
<table class="tbl"><tbody>
<tr><th>주소</th><td>태화시 태화로 100 태화여자고등학교 (우편번호 31571)</td></tr>
<tr><th>버스</th><td>'태화여고' 정류장 하차 — 간선 101, 115 / 지선 7-2<br><span class="muted">감염관리국 운행 조정에 따라 배차 간격이 길어질 수 있습니다.</span></td></tr>
<tr><th>도보</th><td>태화역 2번 출구에서 은행나무길 따라 약 12분</td></tr>
<tr><th>자가용</th><td>개학 준비 기간에는 교내 주차장을 운영하지 않습니다.</td></tr>
</tbody></table>
<div class="note">모든 출입은 <b>정문 검역 게이트</b>로만 가능합니다. 후문과 체육관 쪽 쪽문은 개학 이후에도 당분간 폐쇄합니다.</div>`},

cal: {sec:"학사안내", t:"학사일정", html:`
<div class="cal2"><div><h3 class="sub">2033년 10월</h3>CAL10</div><div><h3 class="sub">2033년 11월</h3>CAL11</div></div>
<table class="tbl sched"><thead><tr><th>날짜</th><th>내용</th><th>비고</th></tr></thead><tbody>
<tr><td>10. 26.(수) ~ 10. 30.(일)</td><td>개학 준비 기간</td><td>교직원 출입</td></tr>
<tr><td>10. 31.(월)</td><td><b>개학</b> · 담임 조회 · 안전 교육</td><td>단축 수업</td></tr>
<tr><td>11. 1.(화)</td><td>급식 재개 (전 학년)</td><td></td></tr>
<tr><td><s>11. 17.(목)</s></td><td><s>대학수학능력시험</s> <span class="st w">연기</span></td><td>교육부 발표에 따라 12. 22.(목)으로 연기</td></tr>
<tr><td>11. 21.(월)</td><td>2학기 방과후학교 개강</td><td>예정</td></tr>
</tbody></table>
<p class="muted small">학사일정은 감염관리국 지침에 따라 변경될 수 있습니다.</p>`},

meal: {sec:"학교생활", t:"급식 안내", html:`
<div class="note">급식은 <b>11. 1.(화)부터 전 학년</b> 정상 운영합니다. 개학일인 10. 31.(월)은 단축 수업으로 급식이 없습니다.</div>
<h3 class="sub">주간 식단표 (10. 31. ~ 11. 4.)</h3>
<div class="sx"><table class="tbl c meal-t"><thead><tr><th>월 10.31</th><th>화 11.1</th><th>수 11.2</th><th>목 11.3</th><th>금 11.4</th></tr></thead><tbody><tr>
<td class="off">급식 없음<br><small>단축 수업</small></td>
<td>현미밥<br>소고기미역국<small>5.6.16</small><br>닭갈비<small>5.6.13.15</small><br>도토리묵무침<small>5.6</small><br>배추김치<small>9</small><br>요구르트<small>2</small></td>
<td>차조밥<br>콩나물국<small>5</small><br>돈육불고기<small>5.6.10</small><br>감자채볶음<br>깍두기<small>9</small><br>사과</td>
<td>찹쌀밥<br>순두부찌개<small>1.5.6.9</small><br>고등어구이<small>7</small><br>시금치나물<small>5.6</small><br>배추김치<small>9</small><br>약과<small>1.5.6</small></td>
<td>카레라이스<small>2.5.6.10</small><br>유부장국<small>5.6</small><br>치킨너겟<small>1.5.6.15</small><br>양배추샐러드<small>1.5</small><br>깍두기<small>9</small></td>
</tr></tbody></table></div>
<p class="muted small">알레르기 유발 식품: 1.난류 2.우유 3.메밀 4.땅콩 5.대두 6.밀 7.고등어 8.게 9.새우 10.돼지고기 11.복숭아 12.토마토 13.아황산류 14.호두 15.닭고기 16.쇠고기 17.오징어 18.조개류 19.잣<br>식재료 수급 상황에 따라 식단이 바뀔 수 있습니다.</p>`},

after: {sec:"학교생활", t:"방과후학교", html:`<div class="note">준비 중입니다.</div>`},

club: {sec:"학교생활", t:"동아리", html:`
<p class="desc">태화여자고등학교에는 5개 분과, 23개의 학생 자율 동아리가 있습니다. 동아리 연합회가 분과별 활동과 축제·발표회를 함께 운영합니다.</p>
<div class="note">휴업 기간 동안 멈췄던 동아리 활동은 <b>11. 21.(월)</b> 방과후학교 개강과 함께 다시 시작합니다. 신입 부원 모집은 재개 후 2주 동안 각 동아리에서 받습니다.</div>
<h3 class="sub">동아리 연합회</h3>
<div class="org"><div class="bx top"><b>회장</b>2학년</div><i class="ln"></i><div class="row"><div class="bx"><b>부회장</b>2학년</div><div class="bx"><b>부회장</b>1학년</div></div><i class="ln"></i><div class="row"><div class="bx"><b>학술 분과</b>분과장</div><div class="bx"><b>공연 분과</b>분과장</div><div class="bx"><b>봉사 분과</b>분과장</div><div class="bx"><b>언론·토론 분과</b>분과장</div><div class="bx"><b>예술·체육 분과</b>분과장</div></div></div>
<h3 class="sub">동아리 목록</h3>
<div class="club"><div class="ph"><b>학술</b><span>5개 동아리</span></div><table class="tbl"><thead><tr><th>동아리명</th><th>동아리 소개</th></tr></thead><tbody><tr><td class="cn">별헤는밤</td><td>천체 관측과 천문학 기초 탐구, 학기마다 교정 관측회 개최</td></tr><tr><td class="cn">PHILO</td><td>인문 고전을 함께 읽고 철학적 질문으로 토론</td></tr><tr><td class="cn">셜록</td><td>법·범죄심리 사례를 분석하고 모의 수사 보고서 작성</td></tr><tr><td class="cn">BIOS</td><td>생명과학 실험을 직접 설계하고 탐구 보고서로 정리</td></tr><tr><td class="cn">CODE:TH</td><td>파이썬·웹 프로그래밍으로 학교생활에 필요한 도구 제작</td></tr></tbody></table></div>
<div class="club"><div class="ph"><b>공연</b><span>5개 동아리</span></div><table class="tbl"><thead><tr><th>동아리명</th><th>동아리 소개</th></tr></thead><tbody><tr><td class="cn">태화합창단</td><td>교가 합창과 정기 연주회, 입학식·졸업식 공연</td></tr><tr><td class="cn">울림</td><td>사물놀이와 국악 타악 공연</td></tr><tr><td class="cn">하모니아</td><td>현악·관악 앙상블, 축제 무대 공연</td></tr><tr><td class="cn">막올림</td><td>연극 동아리, 매년 가을 정기 공연</td></tr><tr><td class="cn">STEP</td><td>방송 댄스·창작 안무, 축제 공연</td></tr></tbody></table></div>
<div class="club"><div class="ph"><b>봉사</b><span>4개 동아리</span></div><table class="tbl"><thead><tr><th>동아리명</th><th>동아리 소개</th></tr></thead><tbody><tr><td class="cn">햇살</td><td>지역 아동센터 학습 멘토링</td></tr><tr><td class="cn">RCY</td><td>청소년적십자, 응급처치 교육과 헌혈 캠페인</td></tr><tr><td class="cn">초록발자국</td><td>교정·하천 환경 정화와 분리배출 캠페인</td></tr><tr><td class="cn">손말</td><td>수어를 배우고 장애 인식 개선 활동</td></tr></tbody></table></div>
<div class="club"><div class="ph"><b>언론·토론</b><span>4개 동아리</span></div><table class="tbl"><thead><tr><th>동아리명</th><th>동아리 소개</th></tr></thead><tbody><tr><td class="cn">태화신문</td><td>학교 신문 발행, 교내 소식 취재와 인터뷰</td></tr><tr><td class="cn">TBS</td><td>교내 방송 송출과 행사 진행</td></tr><tr><td class="cn">논객</td><td>시사 쟁점 디베이트, 교내 토론대회 운영</td></tr><tr><td class="cn">TMUN</td><td>모의유엔 영어 토론과 결의안 작성</td></tr></tbody></table></div>
<div class="club"><div class="ph"><b>예술·체육</b><span>5개 동아리</span></div><table class="tbl"><thead><tr><th>동아리명</th><th>동아리 소개</th></tr></thead><tbody><tr><td class="cn">화담</td><td>회화·드로잉, 학기말 교내 전시회</td></tr><tr><td class="cn">글샘</td><td>시·소설 창작과 문집 발간</td></tr><tr><td class="cn">찰칵</td><td>사진으로 교정과 학교 행사 기록</td></tr><tr><td class="cn">셔틀</td><td>배드민턴, 교내 리그전 운영</td></tr><tr><td class="cn">피구왕</td><td>피구·발야구 등 단체 구기 활동</td></tr></tbody></table></div>`},

health: {sec:"학교생활", t:"보건실", html:`
<table class="tbl"><tbody>
<tr><th>위치</th><td>본관 1층 중앙 현관 왼쪽</td></tr>
<tr><th>운영 시간</th><td>평일 08:00 ~ 16:30 (점심시간 포함)</td></tr>
<tr><th>담당</th><td>보건교사</td></tr>
</tbody></table>
<h3 class="sub">개학 전후 건강 관리 안내</h3>
<ol class="steps">
<li><b>등교 전 자가 확인</b>발열(37.5℃ 이상), 기침, 원인을 알 수 없는 상처나 발진이 있으면 등교하지 말고 담임 선생님께 먼저 알립니다.</li>
<li><b>정문 검역 게이트 통과</b>모든 학생과 교직원은 등교할 때마다 게이트를 통과합니다. 게이트가 '재검'을 표시하면 안내에 따라 보건실로 이동합니다.</li>
<li><b>상처는 바로 보건실로</b>교내에서 다치거나 상처가 생기면 직접 처치하지 말고 반드시 보건실에서 소독·기록을 받습니다.</li>
<li><b>심리 상담</b>휴업 기간의 일로 잠을 이루기 어렵거나 마음이 힘든 학생은 언제든 보건실이나 Wee클래스(본관 2층)를 찾아 주세요.</li>
</ol>
<div class="note">보건실 이용 기록은 감염관리국 지침에 따라 보관하며, 건강 이상이 확인되면 보호자에게 즉시 연락합니다.</div>`},

news: {sec:"알림마당", t:"학교 소식", html:`<div class="note">준비 중입니다.</div>`},

council: {sec:"정보공개", t:"학교운영위원회", html:`
<p class="desc">학교운영위원회는 학부모·교원·지역 위원이 함께 학교 운영의 주요 사항을 심의하는 기구입니다.</p>
<table class="tbl c"><thead><tr><th>구분</th><th>학부모 위원</th><th>교원 위원</th><th>지역 위원</th><th>계</th></tr></thead><tbody><tr><td>정원</td><td>4</td><td>3</td><td>2</td><td>9</td></tr></tbody></table>
<h3 class="sub">회의록</h3>
<table class="list"><thead><tr><th class="num">번호</th><th>제목</th><th class="dt">회의일</th></tr></thead><tbody>
<tr><td class="num">3</td><td class="tl"><a href="#" data-msg="회의록 원문은 행정실에서 열람하실 수 있습니다.">2033학년도 제3차 학교운영위원회 (임시회) — 개학 일정 및 정문 검역 게이트 운영 심의</a></td><td class="dt">2033.10.21</td></tr>
<tr><td class="num">2</td><td class="tl"><a href="#" data-msg="회의록 원문은 행정실에서 열람하실 수 있습니다.">2033학년도 제2차 학교운영위원회 — 1학기 수학여행 계획 심의</a></td><td class="dt">2033.04.06</td></tr>
<tr><td class="num">1</td><td class="tl"><a href="#" data-msg="회의록 원문은 행정실에서 열람하실 수 있습니다.">2033학년도 제1차 학교운영위원회 — 위원장 선출 및 예산 심의</a></td><td class="dt">2033.03.17</td></tr>
</tbody></table>`},

safe: {sec:"정보공개", t:"학교폭력예방", html:`
<div class="cta"><div><b>117</b><span>학교폭력 신고·상담 (24시간)</span></div><div><b>Wee클래스</b><span>본관 2층 · 평일 08:30 ~ 16:30</span></div><div><b>담임 선생님</b><span>언제든 먼저 이야기해 주세요</span></div></div>
<h3 class="sub">이런 것도 학교폭력입니다</h3>
<ul class="bul"><li>단체 대화방에서 특정 학생을 빼거나 놀리는 일</li><li>허락 없이 사진·영상을 찍거나 퍼뜨리는 일, 그것으로 위협하는 일</li><li>물건을 빼앗거나 심부름을 강요하는 일</li><li>소문을 퍼뜨려 따돌리는 일</li></ul>
<h3 class="sub">신고 후 처리 절차</h3>
<ol class="flow"><li>신고 접수</li><li>사안 조사</li><li class="fork"><span>학교장 자체 해결</span><span>심의위원회 요청</span></li><li>보호·선도 조치</li></ol>
<div class="note">휴업 기간 중에 일어난 일도 신고할 수 있습니다. 신고한 학생의 신원은 비밀로 보호됩니다.</div>`},

plan: {sec:"정보공개", t:"학교 교육계획", html:`
<table class="tbl"><tbody>
<tr><th>교육 목표</th><td>스스로 생각하고 서로 돌보는 따뜻한 지성인 육성</td></tr>
<tr><th>중점 과제</th><td><ol class="num-l"><li>안전한 학교 — 출입 관리 강화와 보건 체계 정비</li><li>회복하는 교실 — 휴업 기간 학습 결손 보충, 심리 회복 지원</li><li>함께하는 공동체 — 학부모·지역과의 소통 확대</li></ol></td></tr>
<tr><th>학급 수</th><td>1학년 8학급 · 2학년 8학급 · 3학년 8학급 (총 24학급)</td></tr>
</tbody></table>
<h3 class="sub">첨부 파일</h3>
<table class="list"><tbody>
<tr><td class="tl"><a href="#" data-msg="수정본은 개학 이후 게시됩니다.">2033학년도 학교 교육계획서 (2학기 수정본).pdf</a></td><td class="dt">2033.10.27</td></tr>
<tr><td class="tl"><a href="#" data-msg="개학 준비 기간에는 내려받기를 제공하지 않습니다.">2033학년도 학교 교육계획서.pdf</a></td><td class="dt">2033.02.24</td></tr>
</tbody></table>`},

sitemap: {sec:"", t:"사이트맵", html:`<div class="smap" id="smap"></div>`},
privacy: {sec:"", t:"개인정보처리방침", html:`
<p class="desc">태화여자고등학교는 「개인정보 보호법」에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 원활하게 처리하기 위하여 다음과 같이 개인정보처리방침을 둡니다.</p>
<h3 class="sub">제1조 (처리 목적)</h3><p>학교는 가정통신문 회신, 출입 명부 관리, 학사 안내를 위하여 최소한의 개인정보를 처리합니다.</p>
<h3 class="sub">제2조 (처리 항목)</h3><p>가정통신문 회신서: 이름 또는 별명, 참석 일시, 제출 일시</p>
<h3 class="sub">제3조 (보유 기간)</h3><p>회신서는 해당 학사 일정이 끝난 뒤 지체 없이 파기합니다.</p>
<h3 class="sub">제4조 (개인정보 보호책임자)</h3><p>행정실장 (본관 1층 행정실)</p>`},
email: {sec:"", t:"이메일무단수집거부", html:`<div class="note">본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 이를 위반하면 「정보통신망법」에 따라 처벌될 수 있습니다.<br><span class="muted small">게시일 2024. 3. 1.</span></div>`},
copyright: {sec:"", t:"저작권 정책", html:`<p class="desc">이 누리집에 게시된 글·사진·자료의 저작권은 태화여자고등학교에 있습니다. 비영리 목적의 교육 자료로 쓸 때에는 출처를 밝혀 주시고, 그 밖의 목적으로 쓰려면 행정실에 미리 문의해 주십시오.</p><p class="muted small">학생 사진은 보호자 동의 없이 복제·배포할 수 없습니다.</p>`},
search: {sec:"", t:"통합검색", html:`<div id="sres"></div>`}
};

const NEWS = [
  {t:"정문 검역 게이트 설치 완료", d:"2033.10.24", body:["10월 24일, 본교 정문에 감염관리국이 지정한 검역 게이트가 설치되었습니다.","개학 이후 모든 학생과 교직원은 등교할 때마다 게이트를 통과해야 하며, 후문과 쪽문은 당분간 폐쇄합니다."]},
  {t:"본관 현관 출입 명부 비치", d:"2033.10.26", body:["개학 준비 기간 동안 본관에 출입하는 교직원과 방문객은 현관에 비치된 출입 명부에 이름과 시각을 적어야 합니다.","출입 명부는 행정실에서 보관합니다."]},
  {t:"교정 환경 정비 실시", d:"2033.10.27", body:["개학을 앞두고 교실과 복도, 운동장 정비를 실시하였습니다.","정비가 끝나지 않은 특별실(과학실·미술실 등)은 개학 이후 차례로 개방합니다."]},
  {t:"감염관리국 사태 종식 선언에 따른 개학 결정", d:"2033.10.21", body:["감염관리국의 사태 종식 선언에 따라 학교운영위원회 임시회 심의를 거쳐 10월 31일 전교 개학을 결정하였습니다."]},
  {t:"2033학년도 제63회 입학식", d:"2033.03.02", body:["신입생 248명이 태화여자고등학교의 새 가족이 되었습니다. 입학을 진심으로 축하합니다."]},
  {t:"제60회 졸업식 거행", d:"2033.02.10", body:["제60회 졸업생 여러분의 앞날을 응원합니다."]}
];

function renderPage(id){
  const p = PAGES[id] || PAGES.greet;
  let html = p.html.replace('CAL10', calMonth(2033,10,{26:['ev','준비'],27:['ev',''],28:['ev',''],29:['ev',''],30:['ev',''],31:['big','개학']}))
                   .replace('CAL11', calMonth(2033,11,{1:['ev','급식'],17:['ev','수능 연기'],21:['ev','방과후']}));
  return {p, html};
}
