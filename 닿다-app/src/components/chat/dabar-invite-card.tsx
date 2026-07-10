"use client";

import * as React from "react";
import { Compass, X, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { getFeatureStrings } from "@/lib/feature-strings";
import { countDeepQuestions } from "@/lib/deep-detect";

/**
 * 다바르 초대 카드 — 강요 없는, 단 한 번의 조용한 문.
 *
 * 뜨는 조건 (전부 만족해야):
 *   1. NEXT_PUBLIC_DABAR_URL 이 설정돼 있다 (없으면 기능 자체가 꺼짐 —
 *      다바르가 준비된 뒤 운영자가 URL을 넣는 순간부터 켜진다)
 *   2. 이 세션에서 사용자가 '깊은 질문'(삶의 의미/용서/존재)을 2번 이상 꺼냈다
 *   3. 응답 스트리밍 중이 아니다 (대화의 숨을 끊지 않는다)
 *   4. 이 기기에서 한 번도 보여준 적이 없다 (localStorage) — 닫으면 끝,
 *      다시는 조르지 않는다
 *
 * 원칙: 복음/신앙 문구 없음 — "더 깊이 함께 고민하는 공간"이라는
 * 중립적 초대만. 존엄·자유 우선.
 */
const SEEN_KEY = "selah_dabar_invite_seen";
const MIN_DEEP = 2;
const DABAR_URL = process.env.NEXT_PUBLIC_DABAR_URL || "";

export function DabarInviteCard({
  userTexts,
  streaming,
}: {
  userTexts: string[];
  streaming?: boolean;
}) {
  const { lang } = useLanguage();
  const fs = getFeatureStrings(lang);
  const [dismissed, setDismissed] = React.useState(false);
  const [seen, setSeen] = React.useState(true); // SSR 안전: 기본 숨김

  React.useEffect(() => {
    try {
      setSeen(localStorage.getItem(SEEN_KEY) === "1");
    } catch {
      setSeen(true);
    }
  }, []);

  const deepCount = React.useMemo(
    () => countDeepQuestions(userTexts),
    [userTexts]
  );

  if (!DABAR_URL || seen || dismissed || streaming) return null;
  if (deepCount < MIN_DEEP) return null;

  const close = () => {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    setDismissed(true);
  };

  return (
    <div className="mx-auto mb-5 mt-2 w-full max-w-2xl rounded-2xl border border-selah-moon/25 bg-selah-moon/[0.05] p-4 shadow-soft animate-rise">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-selah-moon/30 bg-selah-moon/[0.08] text-selah-moon">
          <Compass className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold text-selah-cream">
            {fs.dabarInviteTitle}
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-selah-cream2">
            {fs.dabarInviteBody}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <a
              href={DABAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="inline-flex items-center gap-1.5 rounded-full border border-selah-moon/40 px-3 py-1.5 text-[12px] font-medium text-selah-moon transition hover:bg-selah-moon/[0.10]"
            >
              {fs.dabarInviteOpen}
              <ArrowRight className="h-3 w-3" />
            </a>
            <button
              type="button"
              onClick={close}
              className="rounded-full px-3 py-1.5 text-[12px] text-selah-cream3 transition-colors hover:bg-white/[0.04] hover:text-selah-cream"
            >
              {fs.dabarInviteDismiss}
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label={fs.dabarInviteDismiss}
          className="ml-1 rounded-full p-1 text-selah-cream3 transition-colors hover:bg-white/[0.04] hover:text-selah-cream"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
