"use client";

import { useEffect, useMemo, useState } from "react";

export const formatHMS = (totalSeconds) => {
  const s = Math.max(0, totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
};

export const CountdownRing = ({
  initialSeconds = 71 * 3600 + 59 * 60 + 42,
  size = 200,
  stroke = 9,
  color = "#0284C7",
  trackColor = "rgba(100,116,139,0.18)",
  testid = "hero-timer-countdown",
}) => {
  const [left, setLeft] = useState(initialSeconds);

  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const progress = left / initialSeconds;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  const pulse = useMemo(() => {
    const angle = progress * 2 * Math.PI - Math.PI / 2;
    return {
      x: size / 2 + r * Math.cos(angle),
      y: size / 2 + r * Math.sin(angle),
    };
  }, [progress, r, size]);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <span
        className="absolute w-2.5 h-2.5 rounded-full"
        style={{
          left: pulse.x - 5,
          top: pulse.y - 5,
          background: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#475569]">
          Moves in
        </div>
        <div data-testid={testid} className="tabular text-[26px] font-semibold tracking-tight leading-none mt-1.5">
          {formatHMS(left)}
        </div>
      </div>
    </div>
  );
};
