'use client'

import { useCallback } from 'react'

type KeyboardNavOptions = {
  onEnter?: () => void
  onEscape?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
}

export function useKeyboardNav(options: KeyboardNavOptions) {
  return useCallback(
    (e: React.KeyboardEvent) => {
      const handlers: Record<string, (() => void) | undefined> = {
        Enter: options.onEnter,
        Escape: options.onEscape,
        ArrowUp: options.onArrowUp,
        ArrowDown: options.onArrowDown,
        ArrowLeft: options.onArrowLeft,
        ArrowRight: options.onArrowRight,
      }
      const handler = handlers[e.key]
      if (handler) {
        e.preventDefault()
        handler()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options.onEnter, options.onEscape, options.onArrowUp, options.onArrowDown, options.onArrowLeft, options.onArrowRight]
  )
}
