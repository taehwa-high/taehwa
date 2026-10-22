// Supabase REST 호출 (라이브러리 없이 fetch만 사용)
const TH = window.TH;
// 미리보기 모드(config.js 의 PREVIEW:true): 서버 없이 이 브라우저 안에서만 접수를 흉내 낸다.
const MEM = {}; 
function store(){ try { return JSON.parse(localStorage.getItem("th_preview") || "null") || {rows:[], open:true, seq:0}; } catch(e){ return MEM.s || {rows:[], open:true, seq:0}; } }
function save(s){ try { localStorage.setItem("th_preview", JSON.stringify(s)); } catch(e){ MEM.s = s; } }
async function mockRpc(fn, a){
  const s = store(), cap = 5, status = () => ({remaining: Math.max(cap - s.rows.length, 0), open: s.open});
  if(fn === "get_status") return status();
  if(fn === "submit_reply"){
    const nick = (a.p_nickname || "").trim();
    if(!nick || nick.length > 20) return {ok:false, error:"nickname"};
    if(!a.p_dates || !a.p_dates.length) return {ok:false, error:"dates"};
    if(!s.open) return {ok:false, error:"closed"};
    if(s.rows.length >= cap) return {ok:false, error:"full"};
    if(s.rows.some(r => r.nickname.toLowerCase() === nick.toLowerCase())) return {ok:false, error:"duplicate"};
    s.rows.push({id: ++s.seq, nickname: nick, dates: a.p_dates, created_at: new Date().toISOString()}); save(s);
    return {ok:true, remaining: cap - s.rows.length};
  }
  if(a.p_password !== "1234") throw new Error("비밀번호가 맞지 않습니다.");
  if(fn === "office_list") return {rows: s.rows, status: status(), capacity: cap};
  if(fn === "office_delete"){ s.rows = s.rows.filter(r => r.id !== a.p_id); save(s); return status(); }
  if(fn === "office_set_open"){ s.open = !!a.p_open; save(s); return status(); }
}
async function rpc(fn, args){
  if(TH.PREVIEW) return mockRpc(fn, args || {});
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
