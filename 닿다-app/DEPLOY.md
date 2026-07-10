# 셀라 배포 체크리스트

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

## 4.5) 다바르 초대
- 기본 켜짐 — `https://dabar.theamov.com` 으로 연결
- 다른 주소로 바꾸려면 `NEXT_PUBLIC_DABAR_URL` 설정, 잠시 끄려면 `off`
- 뜨는 조건: 사용자가 한 세션에서 깊은 질문(삶의 의미·용서·존재)을 2회 이상
  꺼냈을 때, 기기당 딱 1회. 닫으면 다시 안 뜸.

## 5) 배포 후 확인
- [ ] 로그인 → 대화 1건 (짝사랑 상황) 넣어보고 응답 톤 확인
- [ ] 위기 문구 트리거(자해 언급) 시 안전카드 뜨는지
- [ ] PWA 홈 화면 추가 동작
