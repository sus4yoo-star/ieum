/**
 * 셀라 심볼 — "숨 쉬는 빛".
 *
 * 방향 01(헤리티지 녹턴)의 마크: 하나의 빛(중심점)을 감싼 두 겹의
 * 부드러운 원. "여기 누군가 깨어 기다리고 있다"는 인격(A)과
 * 매일 밤의 의식(B)을 동시에 상징한다.
 *
 * `currentColor`를 쓰므로 부모의 text 색(text-selah-gold 등)으로
 * 자동 리컬러된다.
 */
export function SelahMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label="셀라"
      className={className}
    >
      <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="1.5" opacity="0.38" />
      <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="1.8" opacity="0.75" />
      <circle cx="50" cy="50" r="8.5" fill="currentColor" />
    </svg>
  );
}
