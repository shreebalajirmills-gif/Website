import type { Transition } from 'framer-motion'

type AnimationVariant = {
  hidden: Record<string, unknown>
  visible: Record<string, unknown>
  exit?: Record<string, unknown>
  transition: Transition
}

const ANIMATION_VARIANTS: Record<string, AnimationVariant> = {
  fadeUp: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: { duration: 0.45, ease: 'easeOut' },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  slideRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export type { AnimationVariant }
export { ANIMATION_VARIANTS }
