import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AuroraBackground({
  className,
  children,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Aurora gradients */}
      <div className="absolute inset-0 overflow-hidden">
        {/* First gradient blob */}
        <div
          className="absolute -left-[10%] -top-[10%] h-[600px] w-[600px] animate-aurora-slow rounded-full bg-gradient-to-br from-light_green-400/40 via-india_green-500/30 to-pigment_green-500/40 blur-[100px]"
          style={{
            animationDuration: "15s",
            animationDirection: "alternate",
          }}
        />
        {/* Second gradient blob */}
        <div
          className="absolute -right-[20%] top-[20%] h-[500px] w-[500px] animate-aurora-fast rounded-full bg-gradient-to-br from-pigment_green-400/50 via-light_green-500/30 to-india_green-500/40 blur-[100px]"
          style={{
            animationDuration: "10s",
            animationDirection: "alternate-reverse",
          }}
        />
        {/* Third gradient blob */}
        <div
          className="absolute bottom-[10%] left-[20%] h-[400px] w-[400px] animate-aurora-medium rounded-full bg-gradient-to-tr from-india_green-400/40 via-pigment_green-500/30 to-light_green-500/50 blur-[100px]"
          style={{
            animationDuration: "12s",
            animationDirection: "alternate",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
} 