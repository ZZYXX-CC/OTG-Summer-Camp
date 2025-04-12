'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface LabelInputContainerProps {
  children: ReactNode;
  className?: string;
  tooltip?: string;
}

export const LabelInputContainer = ({
  children,
  className,
  tooltip,
}: LabelInputContainerProps) => {
  return (
    <div className={cn('relative space-y-2', className)}>
      {children}
      {tooltip && (
        <div className="absolute -right-6 top-0">
          <div className="group relative">
            <div className="absolute hidden group-hover:block w-48 -left-1/2 -translate-x-1/2 -translate-y-full p-2 bg-gray-900 text-white text-sm rounded-lg">
              {tooltip}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
