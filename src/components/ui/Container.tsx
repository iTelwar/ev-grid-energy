import { cn } from "./cn";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}
