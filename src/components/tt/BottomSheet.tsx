import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  bodyClassName?: string;
  hideHeader?: boolean;
  footer?: ReactNode;
}

export function BottomSheet({
  open,
  title,
  onClose,
  children,
  bodyClassName,
  hideHeader,
  footer,
}: BottomSheetProps) {
  return (
    <div
      aria-hidden={!open}
      className={cn("fixed inset-0 z-[100] transition", open ? "" : "pointer-events-none")}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[440px] justify-center">
        <div
          className={cn(
            "relative w-full rounded-t-2xl bg-white transition-transform duration-300",
            open ? "translate-y-0" : "translate-y-full",
          )}
        >
          {hideHeader ? (
            <button
              aria-label="Fechar"
              onClick={onClose}
              className="absolute right-2 top-2 z-10 p-2 text-[#161823]"
            >
              <X className="h-5 w-5" />
            </button>
          ) : (
            <div className="relative flex items-center justify-center border-b border-[#f0f0f0] px-4 py-3">
              <span className="text-[15px] font-semibold">{title}</span>
              <button
                aria-label="Fechar"
                onClick={onClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#161823]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          <div className={cn("max-h-[80vh] overflow-y-auto", bodyClassName ?? "px-4 py-3")}>
            {children}
          </div>
          {footer}
        </div>
      </div>
    </div>
  );
}

export function Toasts({ messages }: { messages: string[] }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-1/2 z-[200] flex -translate-y-1/2 flex-col items-center gap-2 px-8">
      {messages.map((m, i) => (
        <div
          key={i}
          className="rounded-lg bg-black/80 px-4 py-2 text-center text-[13px] font-medium text-white"
        >
          {m}
        </div>
      ))}
    </div>
  );
}
