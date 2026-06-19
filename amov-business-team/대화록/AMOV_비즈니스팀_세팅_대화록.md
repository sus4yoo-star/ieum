# AMOV 비즈니스 팀 세팅 — 대화록

세션 정리 · 2026-06-15 · Founder 유상철 ↔ chief-of-staff(Cowork)
이 문서는 이번 세션에서 오간 요청과 처리·산출물을 시간순으로 정리한 기록입니다.

---

## 1. 비즈니스 팀 세팅 요청

**요청:** 회사 헌장(AMOV-ORG)을 작업공간 최상위 운영 원칙으로 저장하고, chief-of-staff가 총괄하며 marketing-lead(+content-writer·designer)·sales·support·theology-reviewer를 지휘하는 구조로 세팅. 4대 규칙: ① 신앙 콘텐츠 theology-reviewer 1차→민감 시 정운영 목사님 ② 아동 관련 무조건 사람 검토 ③ 외부 발송 항상 확인 ④ 디자인 Claude Design(Canva 금지). 끝나면 chief-of-staff가 우선순위 질문.

**처리:**
* `CLAUDE.md` — 헌장 + 4대 게이트를 최상위 운영 원칙으로 저장.
* `agents/` 7개 역할 파일 생성(YAML frontmatter + 본문 verbatim).
* 세션 보안상 `.claude/`에 직접 쓰기가 막혀, 일반 폴더 패키지(`amov-business-team/`)로 제작 + `INSTALL.md` 설치 안내 동봉.
* chief-of-staff가 "오늘 어디부터 시작할까요?" 우선순위 질문.

**산출물:** CLAUDE.md, agents/×7, INSTALL.md

---

## 2. theamov.com 반영

**요청:** theamov.com 참고.

**처리:** 사이트 확인 → `COMPANY.md`(사실 기준 파일) 신설, 헌장이 이를 참조하도록 연결.
* 공개 제품을 4종으로 정정: **다바르(DABAR, 플래그십) · 셀라(SELAH) · 만나(MANNA) · 곁에(GYEOTAE)** — 헌장에 없던 **곁에** 추가, 다바르가 입구가 되는 플래그십임을 반영.
* 브랜드(Inspired by Prayer·Powered by Love, 오렌지 마스터 액센트), 제품별 면책 문구(셀라·만나·곁에는 전문 의료·심리·돌봄 대체 아님), 회사 정보(사업자번호 630-55-00908, 금천구 한내로 69-54, hello@theamov.com) 정리.
* 게임(임마누엘)·골드알로에농장 스토어는 공개 사이트에 없어 "내부 보류"로 표기.

**산출물:** COMPANY.md, CLAUDE.md(참조 링크)

---

## 3. 곁에 마케팅·영업 정식 포함

**요청:** 곁에를 마케팅·영업 대상에 정식 포함.

**처리:** marketing-lead·content-writer·designer·sales 업데이트(곁에 청중=부모님+자녀, 면책 문구 필수, 영업 세그먼트=고령 성도 교회·복지기관·가정). COMPANY.md에 "정식 마케팅·영업 대상(대표 확인)" 표기.

**산출물:** 역할 4종 + COMPANY.md 갱신

---

## 4. 다바르 영업 첫 타깃

**요청:** 다바르 영업 첫 타깃.

**처리:** sales가 다바르 첫 영업 세트 준비.
* `sales/dabar-target-profile.md` — 가치·ICP·3단계 타깃, 1호 파일럿으로 **새빛교회** 추천.
* `sales/dabar-outreach-draft.md` — 사역 톤 첫 메일 + 후속, **미발송**(대표 확인 게이트).
* `sales/pipeline.md` — 파이프라인 트래커.

**산출물:** sales/ 3종

---

## 5. 이음 추가 예고

**요청:** 이음(Ieum) 신규 영리사업 추가 예고, 기존 4종은 비영리. 대화기록 취합 중 → 대기.

**처리:** 영리/비영리 구분 방향 확인 후 대기.

---

## 6. 이음 추가 작업 (영리사업)

**요청:** 다바르 메일 보류. 이음 대화기록 zip 첨부 → 압축 풀어 검토, COMPANY.md에 이음(영리) 추가, 기존 4종 비영리 구분, 역할/구조 파일 업데이트.

**처리:** zip 전체 검토(대화록 2부, 산출물 PDF·HTML) 후 반영.
* `COMPANY.md` — **사업모델 영리/비영리 구분** 추가, 이음 항목 신설(기능 출결→공지→수납, 원칙 "원장은 버튼만", 브랜드 Bond 로고/파랑 #3FA9F2·초록 #8CD004·네이비 #173050, 도메인 ieum.theamov.com, 타깃 광명 철산동, 가격 학생당 1,500원·최소 4만, 채널 서점·총판 소개 수수료 첫 달 50%+유지 10% 영구). aistaff 폐업(2026.6) 기록.
* **이음 전용 게이트:** 신앙 검수 면제(세속), 학생=미성년 데이터 민감, 가격·약속 정직, 외부 발송 확인.
* 역할 7종 모두 이음 반영(sales 최우선 영리 라인, 마케팅·카피·디자인 세속 톤+자체 팔레트, chief-of-staff 라우팅, support 원장·학부모).
* 파이프라인 우선순위를 이음으로 전환, 다바르는 보류 표기. 이음 원자료를 `reference/ieum/`에 보관.

**산출물:** COMPANY.md·CLAUDE.md·역할 7종·pipeline 갱신, reference/ieum/(랜딩·시연·PDF 3종)

---

## 7. 기대효과·카테고리 비교·대안 추천

**요청:** 이음 기대효과(매출 등), 다른 카테고리(병원 등)와 비교, 차라리 앱 개발로 매출 더 올릴 방법이 있으면 추천.

**처리:** 시장 통계 조사 후 `strategy/ieum-revenue-and-alternatives.md` 작성.
* **기대효과:** 매출총이익 ~65%, 현실적 2~3년 상단 학원 50~300곳→연매출 약 4천만~2.5억(영업이익 ~2천만~1.2억), 업셀 시 3.5~5억. 성장 변수=협력 서점·총판 수.
* **비교:** 병원 비추(똑닥 1,000만 가입에도 영업손실 -79억, 규제·EMR), 유치원 불가(키즈노트 40%·무료·카카오), 학원은 수익화·락인 우수하나 레드오션.
* **대안 추천:** 단일 신규앱보다 "채널 × 재사용 엔진 × AI 차별화"의 곱. ① 인접 버티컬 화이트라벨(스터디카페·독서실·예체능) ② AI 상담실장·리포트로 ARPA↑ ③ **곁에 유료화(고령화 — 학원보다 천장 높음)**. 병원·유치원·순수 B2C 신규앱은 회피.

**산출물:** strategy/ieum-revenue-and-alternatives.md

---

## 8. 대화내용 압축파일

**요청:** 여태까지 대화내용을 압축파일로.

**처리:** 본 대화록 작성 + `amov-business-team/` 전체(헌장·역할·사실파일·영업·전략·이음 원자료)를 zip으로 묶어 전달.

---

## 최종 패키지 구성

```
amov-business-team/
├── CLAUDE.md                         # 회사 헌장(AMOV-ORG) — 최상위 운영 원칙
├── COMPANY.md                        # 사실 기준: 제품·브랜드·가격·영리/비영리·면책·회사정보
├── INSTALL.md                        # 설치 안내
├── agents/                           # 7개 역할(chief-of-staff·marketing-lead·content-writer·designer·sales·support·theology-reviewer)
├── sales/                            # dabar-target-profile, dabar-outreach-draft(보류), pipeline
├── strategy/                         # ieum-revenue-and-alternatives
├── reference/ieum/                   # 이음 원자료(랜딩·시연·사업구조도·파트너제안서·MVP기능명세)
└── 대화록/                           # 본 문서
```

비영리: 다바르·셀라·만나·곁에 / 영리: 이음.
```
```
