'use client'

import { cn } from '@/lib/utils'

interface SkeletonBaseProps {
  className?: string
  variant?: 'text' | 'rect' | 'circle'
  animate?: boolean
}

export function SkeletonBase({
  className,
  variant = 'rect',
  animate = true,
}: SkeletonBaseProps) {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className={cn(
        'bg-[var(--color-steel-200)]',
        animate && 'skeleton-shimmer',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'rounded h-4',
        variant === 'rect' && 'rounded-2xl',
        className
      )}
    />
  )
}
