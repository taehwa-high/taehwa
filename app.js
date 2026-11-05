// Supabase REST 호출 (라이브러리 없이 fetch만 사용)
const TH = window.TH;
async function rpc(fn, args){
  const res = await fetch(TH.SUPABASE_URL + "/rest/v1/rpc/" + fn, {
    method: "POST",
    headers: Object.assign({"Content-Type":"application/json", apikey: TH.SUPABASE_KEY},
      TH.SUPABASE_KEY.startsWith("eyJ") ? {Authorization: "Bearer " + TH.SUPABASE_KEY} : {}),   // 새 publishable 키는 JWT가 아니라 apikey 헤더만 보낸다
    body: JSON.stringify(args || {})
  });
  const data = await res.json().catch(() => null);
  if(!res.ok) throw new Error((data && (data.message || data.hint)) || ("요청 실패 " + res.status));
  return data;
}
function esc(s){ return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
const KOR = ["영","한","두","세","네","다섯","여섯","일곱","여덟","아홉","열"];
function slotText(n){ return n <= 0 ? "자리가 모두 찼습니다." : "자리가 " + (KOR[n] || n) + " 개 남아 있습니다."; }
// 암호 입력란: 한글 자판 상태로 쳐도 같은 자리의 영문 자판 글자로 바꾼다 (두벌식 기준)
const KEYS = {ㄱ:"r",ㄲ:"R",ㄴ:"s",ㄷ:"e",ㄸ:"E",ㄹ:"f",ㅁ:"a",ㅂ:"q",ㅃ:"Q",ㅅ:"t",ㅆ:"T",ㅇ:"d",ㅈ:"w",ㅉ:"W",ㅊ:"c",ㅋ:"z",ㅌ:"x",ㅍ:"v",ㅎ:"g",
  ㅏ:"k",ㅐ:"o",ㅑ:"i",ㅒ:"O",ㅓ:"j",ㅔ:"p",ㅕ:"u",ㅖ:"P",ㅗ:"h",ㅘ:"hk",ㅙ:"ho",ㅚ:"hl",ㅛ:"y",ㅜ:"n",ㅝ:"nj",ㅞ:"np",ㅟ:"nl",ㅠ:"b",ㅡ:"m",ㅢ:"ml",ㅣ:"l",
  ㄳ:"rt",ㄵ:"sw",ㄶ:"sg",ㄺ:"fr",ㄻ:"fa",ㄼ:"fq",ㄽ:"ft",ㄾ:"fx",ㄿ:"fv",ㅀ:"fg",ㅄ:"qt"};
const CHO = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ", JUNG = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ", JONG = " ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
function toEng(s){
  return String(s).replace(/[\uAC00-\uD7A3\u3131-\u3163]/g, c => {
    const n = c.charCodeAt(0) - 0xAC00;
    if(n < 0) return KEYS[c] || c;
    return KEYS[CHO[Math.floor(n / 588)]] + KEYS[JUNG[Math.floor(n % 588 / 28)]] + (n % 28 ? KEYS[JONG[n % 28]] : "");
  });
}
function engOnly(el){
  el.setAttribute("lang", "en"); el.setAttribute("autocapitalize", "off"); el.setAttribute("spellcheck", "false");
  const fix = () => { const v = toEng(el.value); if(v !== el.value) el.value = v; };
  el.addEventListener("compositionend", fix);
  el.addEventListener("input", e => { if(!e.isComposing) fix(); });
}
// 기초조사서. 보기는 서희지·한재희·이소록·정의현·배유림 순서로 적고, 화면에서는 섞어 보여 준다 (점수는 서버가 매긴다)
const SURVEY = [
  ["개학 날 아침, 교실에 도착해 가장 먼저 하는 일은?",
    ["시간표를 확인하고 예습한다.","마음에 드는 자리에 앉아 엎드려 잔다.","적당한 뒷자리에 앉아 책을 읽는다.","아슬아슬하게 도착해 친구들과 떠든다.","체육복으로 갈아입는다."]],
  ["가방에 물건 하나만 넣을 수 있다면?", ["문제집","크로키북","책","텅~","운동화"]],
  ["숨기고 싶은 일을 누가 묻는다면?",
    ["꺼져.","그런 거 없는데?","....","아, 배고파. 매점 갈 사람~","어... 그건 왜?"]]
];
