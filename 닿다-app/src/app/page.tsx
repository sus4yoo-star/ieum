"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { LanguageSelector } from "@/components/language-selector";
import { Button } from "@/components/ui/button";
import { AmovFooter } from "@/components/amov-footer";
import { SelahMark } from "@/components/selah-mark";
import { getFeatureStrings } from "@/lib/feature-strings";
import { ArrowRight, MessageCircleHeart, BellRing, Sparkles } from "lucide-react";

export default function HomePage() {
  const { t, lang } = useLanguage();
  const fs = getFeatureStrings(lang);

  const features = [
    { icon: MessageCircleHeart, tone: "text-selah-rose border-selah-rose/25 bg-selah-rose/[0.06]", title: fs.landingFeat1Title, desc: fs.landingFeat1Desc },
    { icon: BellRing, tone: "text-selah-gold border-selah-gold/25 bg-selah-gold/[0.06]", title: fs.landingFeat2Title, desc: fs.landingFeat2Desc },
    { icon: Sparkles, tone: "text-selah-moon border-selah-moon/25 bg-selah-moon/[0.06]", title: fs.landingFeat3Title, desc: fs.landingFeat3Desc },
  ];

  return (
    <main className="selah-aurora relative flex min-h-dvh flex-col items-center justify-center overflow-y-auto px-6 py-12 text-center selah-scroll">
      <div className="absolute right-5 top-[max(20px,env(safe-area-inset-top))]">
        <LanguageSelector compact />
      </div>

      <div className="flex w-full max-w-md flex-col items-center">
        {/* 셀라 heart symbol with a soft breathing aura */}
        <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center animate-fade-in">
          {/* 앰버 온기 + 로즈 포인트가 함께 숨 쉬는 이중 오라 */}
          <span
            className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-breathe rounded-full bg-selah-gold/10 blur-2xl"
            aria-hidden
          />
          <span
            className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 animate-breathe rounded-full bg-selah-rose/15 blur-2xl"
            aria-hidden
          />
          <SelahMark className="relative h-32 w-32 drop-shadow-[0_0_26px_rgba(240,178,116,0.42)]" />
        </div>

        <h1
          className="mb-2 font-serif text-5xl font-semibold tracking-[0.14em] text-selah-gold animate-rise"
          style={{ animationDelay: "0.05s" }}
        >
          셀라
        </h1>
        <p
          className="mb-8 text-sm tracking-wide text-selah-cream3 animate-rise"
          style={{ animationDelay: "0.12s" }}
        >
          {t.tagline}
        </p>

        <p
          className="mb-7 max-w-sm text-[15px] leading-relaxed text-selah-cream2 animate-rise"
          style={{ animationDelay: "0.2s" }}
        >
          {t.introDesc}
        </p>

        {/* 셀라가 해주는 세 가지 — 관계 읽기(로즈) · 먼저 안부(앰버) · 주간 리포트(문) */}
        <div
          className="mb-9 flex w-full max-w-sm flex-col gap-2.5 animate-rise"
          style={{ animationDelay: "0.24s" }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${f.tone}`}
              >
                <f.icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-[13.5px] font-semibold text-selah-cream">
                  {f.title}
                </span>
                <span className="block text-[12.5px] leading-relaxed text-selah-cream3">
                  {f.desc}
                </span>
              </span>
            </div>
          ))}
        </div>

        <blockquote
          className="relative mb-9 w-full max-w-sm overflow-hidden rounded-2xl border border-selah-gold/15 bg-selah-gold/[0.04] px-6 py-6 pl-12 text-left animate-rise"
          style={{ animationDelay: "0.28s" }}
        >
          <span
            aria-hidden
            className="absolute left-4 top-3 font-serif text-5xl leading-none text-selah-rose/60"
          >
            &ldquo;
          </span>
          <p className="font-serif text-[15.5px] italic leading-relaxed text-selah-cream/90">
            {t.verseText}
          </p>
        </blockquote>

        <Button
          asChild
          size="lg"
          className="w-full max-w-xs animate-rise"
          style={{ animationDelay: "0.36s" }}
        >
          <Link href="/chat">
            {t.enter}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        <p
          className="mt-8 max-w-xs text-xs leading-relaxed text-selah-cream3 animate-rise"
          style={{ animationDelay: "0.44s" }}
        >
          {t.note}
        </p>

        <AmovFooter />
      </div>
    </main>
  );
}
