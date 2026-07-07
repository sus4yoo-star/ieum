"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { ArrowLeft, Check, Loader2 } from "lucide-react";

type Gender = "female" | "male" | "other";

const GENDERS: { value: Gender; label: string }[] = [
  { value: "female", label: "여성" },
  { value: "male", label: "남성" },
  { value: "other", label: "기타 / 밝히지 않음" },
];

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline gap-1.5">
        <span className="text-[14px] font-medium text-selah-cream1">{label}</span>
        {required && <span className="text-selah-gold">*</span>}
        {hint && <span className="text-xs text-selah-cream3">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

export default function HealerApplyPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender | null>(null);
  const [contact, setContact] = useState("");
  const [intro, setIntro] = useState("");
  const [story, setStory] = useState("");
  const [availability, setAvailability] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = name.trim() && contact.trim() && agreed && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !contact.trim()) {
      setError("이름과 연락처는 꼭 남겨주세요.");
      return;
    }
    if (!agreed) {
      setError("안전 약속에 동의해주셔야 지원할 수 있어요.");
      return;
    }
    if (!isSupabaseConfigured()) {
      setError("지금은 접수가 어려워요. 잠시 후 다시 시도해주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const ageNum = age.trim() ? parseInt(age.trim(), 10) : null;

      const { error: insertError } = await supabase
        .from("healer_applications")
        .insert({
          user_id: user?.id ?? null,
          name: name.trim(),
          age: Number.isFinite(ageNum) ? ageNum : null,
          gender,
          contact: contact.trim(),
          intro: intro.trim() || null,
          story: story.trim() || null,
          availability: availability.trim() || null,
          agreed,
        });

      if (insertError) throw insertError;
      setDone(true);
    } catch {
      setError("접수 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <main className="selah-aurora relative flex min-h-dvh flex-col items-center justify-center px-6 py-14 text-center">
        <div className="mx-auto flex w-full max-w-md flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-selah-gold/30 bg-selah-gold/10">
            <Check className="h-8 w-8 text-selah-gold" />
          </div>
          <h1 className="mb-3 font-serif text-2xl font-semibold text-selah-cream">
            마음, 잘 받았어요
          </h1>
          <p className="mb-8 max-w-sm text-[15px] leading-relaxed text-selah-cream2">
            지원해주셔서 진심으로 고마워요. 한 분 한 분 정성껏 읽어보고, 남겨주신
            연락처로 개별 연락드릴게요. 당신의 따뜻함이 누군가의 밤을 지켜줄
            거예요.
          </p>
          <Button asChild variant="outline" size="lg" className="w-full max-w-xs">
            <Link href="/">토닥 홈으로</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="selah-aurora relative min-h-dvh overflow-y-auto px-6 py-12 selah-scroll">
      <div className="mx-auto w-full max-w-lg">
        <Link
          href="/healer"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-selah-cream3 transition-colors hover:text-selah-cream"
        >
          <ArrowLeft className="h-4 w-4" />
          토닥 힐러 소개로
        </Link>

        <h1 className="mb-2 font-serif text-2xl font-semibold text-selah-cream">
          힐러 지원하기
        </h1>
        <p className="mb-8 text-[14.5px] leading-relaxed text-selah-cream2">
          편하게 남겨주세요. 정답은 없어요 — 당신이 어떤 사람인지 조금 알고
          싶을 뿐이에요.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Field label="이름 / 닉네임" required>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="불리고 싶은 이름"
              maxLength={40}
            />
          </Field>

          <div className="grid grid-cols-[1fr_auto] gap-4">
            <Field label="연락처" hint="카카오톡 ID · 이메일 · 전화 중 하나" required>
              <Input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="개별 연락드릴 방법"
                maxLength={120}
              />
            </Field>
            <Field label="나이" hint="만 19세 이상">
              <Input
                value={age}
                onChange={(e) => setAge(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="나이"
                inputMode="numeric"
                maxLength={3}
                className="w-24 text-center"
              />
            </Field>
          </div>

          <Field label="성별" hint="이성 매칭 안내에 참고돼요">
            <div className="flex flex-wrap gap-2">
              {GENDERS.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGender(g.value)}
                  className={`rounded-xl border px-4 py-2.5 text-[14px] transition-all ${
                    gender === g.value
                      ? "border-selah-gold bg-selah-gold/15 text-selah-cream"
                      : "border-white/10 bg-selah-bg2/60 text-selah-cream3 hover:text-selah-cream2"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="한 줄 소개">
            <Input
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="당신을 한 줄로 표현한다면"
              maxLength={80}
            />
          </Field>

          <Field label="어떤 마음을 나눌 수 있나요?">
            <Textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="사랑 때문에 아파본 이야기, 왜 힐러가 되고 싶은지, 어떤 사람의 곁을 지켜주고 싶은지 — 편하게 적어주세요."
              rows={6}
              maxLength={1500}
            />
          </Field>

          <Field label="가능한 시간대">
            <Input
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              placeholder="예: 평일 밤 9시 이후, 주말 오후"
              maxLength={120}
            />
          </Field>

          {/* 안전 약속 */}
          <button
            type="button"
            onClick={() => setAgreed((v) => !v)}
            className="flex w-full items-start gap-3 rounded-2xl border border-selah-gold/15 bg-selah-bg2/50 p-4 text-left"
          >
            <span
              className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-all ${
                agreed
                  ? "border-selah-gold bg-selah-gold text-selah-bg"
                  : "border-white/20 bg-transparent"
              }`}
            >
              {agreed && <Check className="h-3.5 w-3.5" />}
            </span>
            <span className="text-[13.5px] leading-relaxed text-selah-cream2">
              토닥 앱 안에서만 대화하고, 상대의 마음과 선택을 존중하며, 어떤
              조작이나 밀어붙임도 하지 않겠습니다. 토닥의 안전 수칙을 따르겠습니다.
            </span>
          </button>

          {error && (
            <p className="text-[13.5px] text-red-300">{error}</p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={!canSubmit}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                보내는 중…
              </>
            ) : (
              "지원서 보내기"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
