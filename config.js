// 사이트 설정. SUPABASE_URL / SUPABASE_KEY 는 Supabase 프로젝트 설정 > API 에서 복사해 넣는다.
window.TH = {
  SUPABASE_URL: "https://uqxsqolcidnypqnxmcwo.supabase.co",
  SUPABASE_KEY: "sb_publishable_AxXOh5W_XIvEu6QjUbQyOQ_Ph4FLcse",   // anon public 키만 넣는다. service_role 키는 절대 넣지 않는다.
  // 회신서의 '참석 일시' 체크 항목. 진행 날짜가 하나면 항목 하나만 둔다.
  CANDIDATE_DATES: ["10월 31일(토) 오후 10시 ~"],
  // 회신서 제출을 받기 시작하는 시각 (한국 시간). 바꿀 때는 Supabase settings 표의 open_at 도 같이 바꾼다. 바로 받으려면 "" 로 둔다.
  OPEN_AT: "2026-10-25T21:00"
};
