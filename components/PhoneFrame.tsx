import type { ReactNode } from "react";

/** Android-style device bezel used to frame web-board "screenshots". */
export default function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[260px] rounded-[2.5rem] border-[6px] border-ink-600 bg-ink p-2 shadow-card ${className}`}
    >
      {/* camera notch */}
      <div className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-ink-600" />
      <div className="overflow-hidden rounded-[1.9rem] bg-ink-gradient">
        {children}
      </div>
    </div>
  );
}
