/**
 * 깊은 질문(성찰/의미) 감지 — 다바르 초대의 트리거.
 *
 * 셀라는 위로(만남)의 방이고, 다바르는 삶의 방향·의미를 더 깊이 걷는
 * 공간이다. 사람이 스스로 "왜 살아야 하나", "어떻게 용서하나",
 * "나는 누구인가" 같은 질문을 반복해서 꺼낼 때에만 — 그때가 문을
 * 살짝 열어 보여줄 유일한 타이밍이다.
 *
 * 원칙: 감지는 전부 클라이언트에서, 카운트만 본다. 아무것도 저장하거나
 * 전송하지 않는다. 초대는 단 한 번, 닫으면 다시 조르지 않는다.
 */

const KO_DEEP: RegExp[] = [
  /왜\s*살(아야|아가야)?/,
  /삶의\s*(의미|이유|목적)/,
  /존재\s*(이유|의미)/,
  /무의미|허무|공허/,
  /나는\s*누구/,
  /어떻게\s*(용서|내려놓|잊)/,
  /용서가\s*안\s*돼/,
  /인생이?\s*(뭘까|뭐지|무엇)/,
  /죽음|죽는다는\s*게/,
  /내가\s*(왜\s*)?태어났/,
  /가치가\s*없/,
  /방향을\s*모르겠/,
];

const EN_DEEP: RegExp[] = [
  /\b(meaning|purpose) of (life|it all|living)\b/i,
  /\bwhy (do i|should i|am i) (live|living|alive|exist)/i,
  /\bwho am i\b/i,
  /\bhow (do|can) i forgive\b/i,
  /\bwhat('s| is) the point\b/i,
  /\b(everything feels|it all feels) (meaningless|empty|pointless)\b/i,
  /\bwhat happens (when|after) (we|i) die\b/i,
  /\bi feel (worthless|like nothing)\b/i,
  /\blost (all )?direction\b/i,
];

/** 한 문장이 '깊은 질문'인지. */
export function isDeepQuestion(text: string): boolean {
  const s = String(text || "");
  if (!s.trim()) return false;
  for (const re of KO_DEEP) if (re.test(s)) return true;
  for (const re of EN_DEEP) if (re.test(s)) return true;
  return false;
}

/** 사용자 메시지 목록에서 깊은 질문 개수를 센다. */
export function countDeepQuestions(texts: string[]): number {
  let n = 0;
  for (const t of texts) if (isDeepQuestion(t)) n++;
  return n;
}
