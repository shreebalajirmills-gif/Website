'use client'

import { useRef } from 'react'
import { useInView, type UseInViewOptions } from 'framer-motion'

interface UseScrollAnimationOptions {
  threshold?: number  // 0 to 1, default 0.15
  once?: boolean      // default true
  margin?: UseInViewOptions['margin']  // rootMargin string
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.15, once = true, margin = '-50px 0px' } = options
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, {
    amount: threshold,
    once,
    margin,
  })
  return { ref, isInView }
}
