'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface MouseParallaxState {
  x: number  // bounded to [-strength, strength]
  y: number  // bounded to [-strength, strength]
}

export function useMouseParallax(strength: number = 1): MouseParallaxState {
  const [position, setPosition] = useState<MouseParallaxState>({ x: 0, y: 0 })
  const targetRef = useRef<MouseParallaxState>({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const isReducedMotion = useReducedMotion()

  useEffect(() => {
    // Return { x: 0, y: 0 } immediately and skip rAF when reduced-motion is active
    if (isReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const rawX = ((e.clientX / window.innerWidth) - 0.5) * 2 * strength
      const rawY = ((e.clientY / window.innerHeight) - 0.5) * 2 * strength
      // Bound output to [-strength, strength]
      targetRef.current = {
        x: Math.max(-strength, Math.min(strength, rawX)),
        y: Math.max(-strength, Math.min(strength, rawY)),
      }
    }

    // Lerp toward target at ~60fps
    const tick = () => {
      setPosition(prev => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.06,
        y: prev.y + (targetRef.current.y - prev.y) * 0.06,
      }))
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [strength, isReducedMotion])

  return position
}
