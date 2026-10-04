import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="min-h-screen w-full bg-[#e5e5e7]">
      <div className="mx-auto min-h-screen w-full max-w-[440px] bg-white shadow-[0_0_40px_rgba(0,0,0,0.08)]">
        <div className={cn("relative min-h-screen", className)}>{children}</div>
      </div>
    </div>
  );
}

export function TikTokRibbon() {
  return (
    <div aria-hidden="true" className="h-[4px] overflow-hidden bg-white">
      <svg height="4" preserveAspectRatio="none" width="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            height="4"
            id="tt-ribbon-generic"
            patternUnits="userSpaceOnUse"
            width="64"
            x="0"
            y="0"
          >
            <rect fill="#25f4ee" height="2.5" rx="0.5" transform="skewX(-20)" width="26" x="2" y="0.75" />
            <rect fill="#fe2c55" height="2.5" rx="0.5" transform="skewX(-20)" width="26" x="34" y="0.75" />
          </pattern>
        </defs>
        <rect fill="url(#tt-ribbon-generic)" height="4" width="100%" />
      </svg>
    </div>
  );
}
