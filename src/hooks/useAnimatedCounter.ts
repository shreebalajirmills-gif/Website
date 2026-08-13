'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { animate, useReducedMotion, type Easing } from 'framer-motion'

interface UseAnimatedCounterOptions {
  from?: number       // default 0
  to: number
  duration?: number   // seconds, default 2.0
  decimals?: number   // default 0
  easing?: Easing     // framer-motion easing, default 'easeOut'
  format?: (value: number) => string
  startOnMount?: boolean  // default false — start when start() called
}

export function useAnimatedCounter(options: UseAnimatedCounterOptions) {
  const {
    from = 0,
    to,
    duration = 2.0,
    decimals = 0,
    easing = 'easeOut' as const,
    format,
    startOnMount = false,
  } = options

  const [value, setValue] = useState(from)
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null)
  const isReducedMotion = useReducedMotion()

  const start = useCallback(() => {
    if (isReducedMotion) {
      setValue(to)
      return
    }
    // Cancel any in-flight animation before restarting
    if (controlsRef.current) {
      controlsRef.current.stop()
    }
    controlsRef.current = animate(from, to, {
      duration,
      ease: easing,
      onUpdate: (latest) => {
        setValue(parseFloat(latest.toFixed(decimals)))
      },
    })
  }, [from, to, duration, decimals, easing, isReducedMotion])

  useEffect(() => {
    let timer: number | undefined;
    if (startOnMount) {
      timer = window.setTimeout(() => {
        start();
      }, 0);
    }
    return () => {
      if (timer) clearTimeout(timer);
      controlsRef.current?.stop();
    };
  }, [startOnMount, start]);

  const display = format ? format(value) : value.toLocaleString('en-IN')
  return { value, display, start }
}
