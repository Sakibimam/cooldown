"use client";

export const Logo = ({ dark = false, size = 30 }) => (
  <span className="inline-flex items-center gap-2.5">
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="29" fill={dark ? "#F6F8FA" : "#0B1220"} />
      <path d="M32 32 L32 15" stroke={dark ? "#0B1220" : "#F6F8FA"} strokeWidth="4" strokeLinecap="round" />
      <path d="M32 32 L46 41" stroke="#FF4D2E" strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="32" r="3.2" fill={dark ? "#0B1220" : "#F6F8FA"} />
    </svg>
    <span
      className={`text-[17px] font-semibold tracking-tight ${dark ? "text-white" : "text-[#0B1220]"}`}
    >
      Cooldown
    </span>
  </span>
);
