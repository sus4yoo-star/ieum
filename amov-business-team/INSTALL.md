# AMOV 비즈니스 팀 설치 안내

이 폴더는 Cowork에서 AMOV 비즈니스 팀을 구동하기 위한 전체 세트입니다.

## 폴더 구성

```
amov-business-team/
├── CLAUDE.md                  # 회사 헌장 (AMOV-ORG) — 최상위 운영 원칙
├── COMPANY.md                 # 사실 기준: 제품·브랜드·가격·영리/비영리 구분·면책·회사정보
├── INSTALL.md                 # 이 파일
├── agents/
│   ├── chief-of-staff.md      # 총괄 (비즈니스 진입점)
│   ├── marketing-lead.md      # 마케팅 리드
│   ├── content-writer.md      #  └ 카피
│   ├── designer.md            #  └ 디자인 (Claude Design)
│   ├── sales.md               # 영업
│   ├── support.md             # 고객지원
│   └── theology-reviewer.md   # 신앙/교리 1차 검수
├── sales/                     # 영업 산출물
│   ├── dabar-target-profile.md
│   ├── dabar-outreach-draft.md   # (보류) 다바르 아웃리치 초안
│   └── pipeline.md               # 파이프라인 (이음 우선)
└── reference/ieum/            # 이음 원자료 (랜딩·시연·사업구조도·제안서·기능명세)
```

영리/비영리 구분: **영리** = 이음(Ieum, 학원앱) · **비영리** = 다바르·셀라·만나·곁에.

## 설치 방법

이 세션은 보안상 `.claude/` 폴더에 직접 쓰는 것을 막아두었기 때문에,
파일을 일반 폴더에 만들어 두었습니다. 작업공간에 적용하려면 두 가지를 옮기면 됩니다.

1. `CLAUDE.md` → 작업공간(워크스페이스) 최상위에 둡니다.
2. `agents/` 폴더 안의 7개 파일 → 작업공간의 `.claude/agents/` 폴더로 복사합니다.
   (`.claude/agents/` 폴더가 없으면 새로 만드세요.)

복사 후 Cowork를 새로고침하면 `chief-of-staff`를 비롯한 7개 역할이 활성화됩니다.

## 조직 구조

```
유상철 (Founder/CEO) ─ 정운영 목사 (교리 최종권한)
        │
   chief-of-staff (총괄)
        ├── marketing-lead
        │       ├── content-writer
        │       └── designer
        ├── sales
        ├── support
        └── theology-reviewer
```

## 항상 적용되는 게이트

1. 신앙 콘텐츠 → theology-reviewer 1차 검수 → 민감 시 정운영 목사님
2. 아동 관련 → 무조건 사람 검토 (자동 승인 금지)
3. 외부 발송(메일·게시) → 항상 유상철 확인 후 발송
4. 디자인 → Claude Design 사용 (Canva 금지)
