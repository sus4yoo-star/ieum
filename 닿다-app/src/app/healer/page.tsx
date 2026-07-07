import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, MessageCircleHeart, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "토닥 힐러 — 아픈 밤을 지켜주는 사람",
  description:
    "사랑으로 아파본 당신이, 지금 아픈 누군가의 밤을 지켜줄 수 있어요. 토닥 힐러를 찾습니다.",
};

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-selah-gold/12 bg-selah-bg2/60 p-6 text-left">
      <div className="mb-3 flex items-center gap-2.5 text-selah-gold">
        {icon}
        <h3 className="font-serif text-lg text-selah-cream">{title}</h3>
      </div>
      <div className="text-[14.5px] leading-relaxed text-selah-cream2">{children}</div>
    </div>
  );
}

export default function HealerLandingPage() {
  return (
    <main className="selah-aurora relative min-h-dvh overflow-y-auto px-6 py-14 selah-scroll">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        {/* symbol */}
        <div className="relative mb-6 flex h-24 w-32 items-center justify-center">
          <span
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-selah-gold/10 blur-2xl"
            aria-hidden
          />
          <img
            src="/symbol-transparent.png"
            alt="토닥"
            className="relative h-24 w-32 object-contain drop-shadow-[0_0_26px_rgba(240,178,116,0.42)]"
          />
        </div>

        <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-selah-gold">
          TODAK HEALER
        </p>
        <h1 className="mb-4 font-serif text-3xl font-semibold leading-snug text-selah-cream sm:text-4xl">
          아픈 밤을 지켜주는 사람,
          <br />
          토닥 힐러를 찾아요
        </h1>
        <p className="mb-10 max-w-md text-[15.5px] leading-relaxed text-selah-cream2">
          사랑으로 깊이 아파본 당신이라면, 지금 그 밤을 지나는 누군가의 곁을
          지켜줄 수 있어요. 거창한 자격이 아니라, 진심 하나면 됩니다.
        </p>

        {/* 토닥은 2층 */}
        <div className="mb-10 w-full rounded-2xl border border-selah-gold/15 bg-selah-gold/[0.04] p-6 text-left">
          <p className="text-[15px] leading-relaxed text-selah-cream1">
            토닥은 두 개의 층으로 되어 있어요. <br className="hidden sm:block" />
            <span className="text-selah-cream3">1층</span>에선 AI가 언제나 곁에
            있어요. 하지만 진짜 온기는 사람에게서 옵니다.{" "}
            <span className="text-selah-gold">2층</span>엔 당신 같은 힐러가
            있어요 — 판단 없이, 끝까지 마음을 들어주는 진짜 사람.
          </p>
        </div>

        {/* 카드들 */}
        <div className="mb-10 grid w-full gap-4">
          <Card icon={<Heart className="h-5 w-5" />} title="이런 분을 찾아요">
            사랑 때문에 깊이 아파본 적 있는 분. 남의 이야기를 판단 없이 끝까지
            들어줄 수 있는 분. 자격증은 필요 없어요 — 필요한 건 따뜻함과 진심입니다.
          </Card>
          <Card
            icon={<ShieldCheck className="h-5 w-5" />}
            title="우리의 약속 (안전)"
          >
            모든 대화는 토닥 앱 안에서만 이뤄져요. 개인 연락처를 주고받지 않아도
            안전하게 마음을 나눌 수 있어요. 힐러의 안전도 함께 지킵니다 — 신고·차단·검수
            장치가 늘 곁에 있어요.
          </Card>
          <Card
            icon={<MessageCircleHeart className="h-5 w-5" />}
            title="어떻게 하나요"
          >
            아래 지원서를 남겨주시면, 저희가 한 분 한 분 정성껏 검토한 뒤 개별로
            연락드려요. 짧은 대화를 나누고, 함께 시작하게 됩니다.
          </Card>
        </div>

        <Button asChild size="lg" className="w-full max-w-xs">
          <Link href="/healer/apply">
            힐러 지원하기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <p className="mt-4 text-xs leading-relaxed text-selah-cream3">
          지원서를 남겨주시면 검토 후 개별로 연락드려요. 지금은 초대제로 천천히
          시작하고 있어요.
        </p>
      </div>
    </main>
  );
}
