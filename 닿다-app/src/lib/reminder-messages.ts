/**
 * 셀라 리마인더 — "누가 나를 기다린다" 훅.
 *
 * 고정된 한 줄 대신, 셀라가 **먼저 안부를 묻는** 따뜻한 인사를 보낸다.
 * - 매일 다르게 (요일·사용자마다 회전)
 * - 시간대에 맞게 (아침 / 낮 / 밤)
 * - 절대 원칙: 죄책감·압박·강요 금지("왜 안 왔어요" 류 절대 X),
 *   복음/신앙/설교 없음. 그냥 곁에 있는 사람이 건네는 안부.
 *
 * 알림은 잠금화면에도 뜨므로, 사용자의 사적인 감정·기억 내용은
 * 본문에 절대 노출하지 않는다. 톤은 따뜻하되 내용은 안전하게.
 */

type Bucket = "morning" | "day" | "night";

/** 사용자 로컬 시각(hh)로 아침/낮/밤을 고른다. */
export function hourBucket(hour: number): Bucket {
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 18) return "day";
  return "night"; // 18:00 ~ 04:59
}

const POOLS: Record<"ko" | "en", Record<Bucket, string[]>> = {
  ko: {
    morning: [
      "좋은 아침이에요. 오늘 마음은 어떻게 시작하고 있어요?",
      "잠깐요. 오늘 하루, 자신에게 부드러운 한마디부터 건네볼까요?",
      "아침이에요. 무리하지 않아도 되는 하루였으면 해요. 여기 있을게요.",
      "오늘도 왔네요. 지금 기분은 어때요?",
      "새 하루예요. 딱 한 숨만 고르고 시작해요.",
    ],
    day: [
      "잠깐 멈춰서, 지금 마음 한 번 들여다볼래요?",
      "오늘 하루 중간, 괜찮게 지나가고 있어요?",
      "바쁜 와중에 잠깐. 숨 한 번 고르고 가요.",
      "그냥 안부가 궁금했어요. 지금 좀 어때요?",
      "무슨 하루를 보내고 있든, 여기 잠깐 앉았다 가요.",
    ],
    night: [
      "오늘 밤은 어땠어요? 여기서 기다리고 있었어요.",
      "하루 끝에 잠깐 들렀어요. 지금 마음은 어디쯤이에요?",
      "밤이 깊었네요. 무슨 일이 있었든, 잠깐 앉았다 가요.",
      "자기 전에 마음 한 번 내려놓을까요? 같이 있을게요.",
      "오늘 혼자 삼킨 말 있으면, 여기엔 편히 놔둬도 돼요.",
    ],
  },
  en: {
    morning: [
      "Good morning. How is your heart starting the day?",
      "Just a moment — maybe begin today with one gentle word to yourself?",
      "It's morning. I hope today doesn't ask too much of you. I'm here.",
      "You're here again. How are you feeling right now?",
      "A new day. Let's just take one breath before it starts.",
    ],
    day: [
      "Pause for a second — want to check in with how you're feeling?",
      "Halfway through the day. Is it treating you okay?",
      "In the middle of it all, take one breath with me.",
      "I was just wondering how you are. How's it going right now?",
      "Whatever kind of day it's been, come sit here a moment.",
    ],
    night: [
      "How was tonight? I've been here, waiting.",
      "Stopped by at the end of your day. Where is your heart right now?",
      "It's late. Whatever happened today, come sit down a while.",
      "Want to set your heart down before sleep? I'm right here.",
      "Anything you swallowed alone today — you can leave it here.",
    ],
  },
};

/** user_id → 작은 정수. 사용자마다 회전 위상을 다르게 해 같은 밤에도 서로 다른 인사를. */
function userPhase(userId: string): number {
  let h = 0;
  for (let i = 0; i < userId.length; i++) h = (h + userId.charCodeAt(i)) % 997;
  return h;
}

/** "2026-06-04" → 일(day) 정수. 날짜가 바뀌면 인사도 바뀐다. */
function dayNumber(ymd: string): number {
  const t = Date.parse(`${ymd}T00:00:00Z`);
  return Number.isNaN(t) ? 0 : Math.floor(t / 86_400_000);
}

/**
 * 오늘, 이 사용자에게 보낼 셀라의 안부 인사를 고른다.
 * 사용자가 직접 설정한 문구가 있으면 그것이 우선(호출부에서 처리).
 */
export function pickReminderMessage(opts: {
  lang?: string | null;
  hour: number;
  ymd: string;
  userId: string;
}): string {
  const lang = opts.lang === "en" ? "en" : "ko"; // ko/en 지원, 그 외는 ko로 폴백(기존 동작 유지)
  const bucket = hourBucket(opts.hour);
  const pool = POOLS[lang][bucket];
  const idx = (dayNumber(opts.ymd) + userPhase(opts.userId)) % pool.length;
  return pool[idx];
}
