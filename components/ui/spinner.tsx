import { cn } from '@/lib/utils';
import {
  LoaderCircleIcon,
  LoaderIcon,
  LoaderPinwheelIcon,
  type LucideProps,
} from 'lucide-react';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'default'
    | 'circle'
    | 'pinwheel'
    | 'circle-filled'
    | 'ellipsis'
    | 'ring'
    | 'bars'
    | 'infinite';
  size?: number;
}

const Default = ({ className, size = 24, ...props }: SpinnerProps) => (
  <div className={cn('inline-flex', className)}>
    <LoaderIcon className="animate-spin" size={size} />
  </div>
);

const Circle = ({ className, size = 24, ...props }: SpinnerProps) => (
  <div className={cn('inline-flex', className)}>
    <LoaderCircleIcon className="animate-spin" size={size} />
  </div>
);

const Pinwheel = ({ className, size = 24, ...props }: SpinnerProps) => (
  <div className={cn('inline-flex', className)}>
    <LoaderPinwheelIcon className="animate-spin" size={size} />
  </div>
);

const CircleFilled = ({
  className,
  size = 24,
  ...props
}: SpinnerProps) => (
  <div className={cn('relative inline-flex', className)} {...props}>
    <div className="absolute inset-0 rotate-180">
      <LoaderCircleIcon
        className="animate-spin text-foreground opacity-20"
        size={size}
      />
    </div>
    <LoaderCircleIcon
      className="relative animate-spin"
      size={size}
    />
  </div>
);

const Ellipsis = ({ size = 24, className, ...props }: SpinnerProps) => (
  <div
    className={cn('relative inline-flex', className)}
    style={{ width: size, height: size }}
    {...props}
  >
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-2 w-2 rounded-full bg-current animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);

const Ring = ({ className, size = 24, ...props }: SpinnerProps) => (
  <div
    className={cn('inline-flex animate-spin', className)}
    style={{ width: size, height: size }}
    {...props}
  >
    <div className="h-full w-full rounded-full border-4 border-t-transparent border-current opacity-75" />
  </div>
);

const Bars = ({ className, size = 24, ...props }: SpinnerProps) => (
  <div
    className={cn('inline-flex items-center justify-center space-x-1', className)}
    style={{ width: size, height: size }}
    {...props}
  >
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="h-full w-1.5 bg-current animate-pulse"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

const Infinite = ({ className, size = 24, ...props }: SpinnerProps) => (
  <div
    className={cn('relative inline-flex', className)}
    style={{ width: size, height: size }}
    {...props}
  >
    <div className="absolute inset-0 animate-[spin_1.5s_linear_infinite]">
      <div className="h-full w-full rounded-full border-4 border-t-transparent border-current opacity-25" />
    </div>
    <div className="absolute inset-0 animate-[spin_1s_linear_infinite]">
      <div className="h-full w-full rounded-full border-4 border-t-transparent border-current opacity-75" />
    </div>
  </div>
);

export function Spinner({ variant = 'default', size, className, ...props }: SpinnerProps) {
  const Component = {
    default: Default,
    circle: Circle,
    pinwheel: Pinwheel,
    'circle-filled': CircleFilled,
    ellipsis: Ellipsis,
    ring: Ring,
    bars: Bars,
    infinite: Infinite,
  }[variant];

  return <Component size={size} className={className} {...props} />;
}
