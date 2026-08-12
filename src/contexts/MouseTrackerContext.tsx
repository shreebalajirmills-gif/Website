'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

interface MousePosition {
  x: number    // normalized -1 to 1
  y: number    // normalized -1 to 1
  rawX: number // pixels
  rawY: number // pixels
}

const defaultPosition: MousePosition = { x: 0, y: 0, rawX: 0, rawY: 0 }

const MouseTrackerContext = createContext<MousePosition>(defaultPosition)

export function MouseTrackerProvider({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState<MousePosition>(defaultPosition)
  const targetRef = useRef<{ rawX: number; rawY: number }>({ rawX: 0, rawY: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Exactly one passive mousemove listener on window
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { rawX: e.clientX, rawY: e.clientY }
    }

    // Single rAF loop applying lerp factor 0.06
    const tick = () => {
      setPosition(prev => {
        const tx = targetRef.current.rawX
        const ty = targetRef.current.rawY
        const w = window.innerWidth
        const h = window.innerHeight

        const targetNormX = ((tx / w) - 0.5) * 2
        const targetNormY = ((ty / h) - 0.5) * 2

        const newX = prev.x + (targetNormX - prev.x) * 0.06
        const newY = prev.y + (targetNormY - prev.y) * 0.06

        // Only update if meaningfully different to avoid unnecessary re-renders
        if (Math.abs(newX - prev.x) < 0.0001 && Math.abs(newY - prev.y) < 0.0001) {
          return prev
        }
        return {
          x: newX,
          y: newY,
          rawX: tx,
          rawY: ty,
        }
      })
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <MouseTrackerContext.Provider value={position}>
      {children}
    </MouseTrackerContext.Provider>
  )
}

export function useMouseTracker(): MousePosition {
  return useContext(MouseTrackerContext)
}
