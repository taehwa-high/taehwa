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
