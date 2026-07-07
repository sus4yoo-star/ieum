# 토닥 배포 체크리스트

## 1) Supabase (로그인·DB)
- [ ] supabase.com에서 프로젝트 생성
- [ ] `supabase/migrations/*.sql` 순서대로 실행 (SQL Editor)
- [ ] Project Settings → API 에서 URL, anon key, service_role key 복사

## 2) Anthropic (AI 대화)
- [ ] console.anthropic.com 에서 API 키 발급 → ANTHROPIC_API_KEY

## 3) Web Push (선택 — 리마인더)
- [ ] `npx web-push generate-vapid-keys` 로 public/private 키 생성

## 4) Netlify 배포
- [ ] GitHub 저장소 연결, **Base directory = `닿다-app`**
- [ ] Build command `next build`, plugin `@netlify/plugin-nextjs` (이미 devDeps에 있음)
- [ ] 환경변수: `.env.example`의 값들 전부 입력
- [ ] 도메인 연결 (예: todak.theamov.com)

## 5) 배포 후 확인
- [ ] 로그인 → 대화 1건 (짝사랑 상황) 넣어보고 응답 톤 확인
- [ ] 위기 문구 트리거(자해 언급) 시 안전카드 뜨는지
- [ ] PWA 홈 화면 추가 동작
