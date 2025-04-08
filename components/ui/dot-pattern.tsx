import { cn } from "@/lib/utils"

interface DotPatternProps {
  width?: number
  height?: number
  cx?: number
  cy?: number
  cr?: number
  className?: string
}

export function DotPattern({
  width = 16,
  height = 16,
  cx = 2,
  cy = 2,
  cr = 1,
  className,
}: DotPatternProps) {
  return (
    <svg
      className={cn("absolute inset-0 h-full w-full", className)}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="dot-pattern"
          x="0"
          y="0"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={cx}
            cy={cy}
            r={cr}
            fill="currentColor"
            className="text-pakistan_green-900/10"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
  )
} 