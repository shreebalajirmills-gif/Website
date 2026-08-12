# Implementation Plan: Website Performance & UI Enhancements

## Overview

Implement the three-pillar enhancement strategy for the Shree Balaji Rolling Mills Next.js site: optimized build configuration (Turbopack + bundle splitting), a skeleton loading system for perceived performance, and a full interactive animation layer (Framer Motion + Three.js enhancements). All tasks are in TypeScript and build incrementally — each step integrates into the running app before the next begins.

---

## Tasks

- [x] 1. Optimize Next.js configuration and add bundle analyzer
  - [x] 1.1 Rewrite `next.config.ts` with full performance configuration
    - Enable `turbopack` block with `resolveAlias: { '@': './src' }`
    - Add SWC `compiler.removeConsole` gated on `NODE_ENV === 'production'`
    - Configure `images` with `formats: ['image/avif', 'image/webp']`, `deviceSizes: [640,750,828,1080,1200,1920]`, and `minimumCacheTTL: 2592000` (30 days)
    - Add `headers()` async function applying `Cache-Control: public, max-age=31536000, immutable` to image extensions and `/_next/static/:path*`
    - Add webpack `splitChunks` for `vendor-three` (priority 30, async), `vendor-framer` (priority 25, async), and `vendors` (priority 10, all)
    - Add `experimental.optimizePackageImports: ['lucide-react', 'framer-motion']` and `experimental.optimizeCss: true`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9_

  - [x] 1.2 Add `@next/bundle-analyzer` as a dev dependency and wrap config
    - Install `@next/bundle-analyzer` as a dev dependency in `website/package.json`
    - Wrap `nextConfig` with `withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })` in `next.config.ts`
    - _Requirements: 22.1, 22.2_

- [x] 2. Implement dynamic import strategy in `src/app/page.tsx`
  - [x] 2.1 Replace static imports with `next/dynamic` for Three.js canvases
    - Import `SteelHeroCanvas`, `SteelSparksCanvas`, and `SteelProductViewer` via `dynamic()` with `ssr: false`
    - Each dynamic import should resolve the named export (`.then(m => ({ default: m.ComponentName }))`)
    - _Requirements: 2.1, 2.4_

  - [x] 2.2 Add `next/dynamic` code-splitting for `GrowthTimeline` and `InquiryForm`
    - Import `GrowthTimeline` and `InquiryForm` via `dynamic()` with SSR enabled (default)
    - Wrap each in a `<Suspense>` boundary with the matching skeleton component as the `fallback`
    - _Requirements: 2.2, 2.3_

- [ ] 3. Build the skeleton loader system
  - [x] 3.1 Create `SkeletonBase` component and add shimmer CSS to `globals.css`
    - Create `src/components/ui/skeleton/SkeletonBase.tsx` as a `'use client'` component
    - Accept `variant` (`text` | `rect` | `circle`), `className`, and `animate` props
    - Render a `role="status"` element with `aria-label="Loading..."`
    - Apply `skeleton-shimmer` class when `animate` is `true`
    - Add `@keyframes shimmer` and `.skeleton-shimmer` utility to `src/app/globals.css`
    - Add `@media (prefers-reduced-motion: reduce)` rule to disable shimmer animation
    - _Requirements: 3.1, 3.2, 3.3, 17.3_

  - [~] 3.2 Create `HeroSectionSkeleton` and `ProductHubSkeleton`
    - Create `src/components/ui/skeleton/HeroSectionSkeleton.tsx` mirroring the hero section layout (badge, 3 heading lines, 4 card placeholders in `grid-cols-4`, metric banner)
    - Create `src/components/ui/skeleton/ProductHubSkeleton.tsx` mirroring the product hub layout (heading block, 2 full-height cards in `grid-cols-2`)
    - _Requirements: 3.4, 3.5, 3.6, 3.7_

  - [~] 3.3 Create remaining section skeletons
    - Create `GrowthTimelineSkeleton`, `InquiryFormSkeleton`, `TrustSectionSkeleton`, `ContactSectionSkeleton`, and `FooterSkeleton` in `src/components/ui/skeleton/`
    - Each must mirror the real component's outer dimensions to prevent CLS
    - _Requirements: 3.6, 3.7_

- [x] 4. Create animation variant catalog and core hooks
  - [x] 4.1 Create `src/lib/animation-variants.ts` with `ANIMATION_VARIANTS` record
    - Export the `AnimationVariant` type and `ANIMATION_VARIANTS` constant
    - Include `fadeUp` (`y: 32→0`, 0.55s), `fadeIn` (opacity only, 0.45s), `slideLeft` (`x: -40→0`, 0.5s), `slideRight` (`x: 40→0`, 0.5s), `scaleIn` (`scale: 0.92→1`, 0.5s)
    - All use cubic-bezier `[0.16, 1, 0.3, 1]` except `fadeIn` which uses `easeOut`
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 4.2 Create `src/hooks/useReducedMotion.ts`
    - Re-export `useReducedMotion` from `framer-motion` as a named export
    - _Requirements: 8.10_

  - [x] 4.3 Create `src/hooks/useScrollAnimation.ts`
    - Use Framer Motion's `useInView` with `amount`, `once`, and `margin` options
    - Return `{ ref, isInView }` with defaults `threshold=0.15`, `once=true`, `margin='-50px'`
    - _Requirements: 8.1, 5.3_

  - [x] 4.4 Create `src/hooks/useAnimatedCounter.ts`
    - Accept `from`, `to`, `duration`, `decimals`, `easing`, `format`, and `startOnMount` props
    - Expose `{ value, display, start }` — `start()` cancels any in-flight animation before restarting
    - Gate with `useReducedMotion`: immediately set to `to` when reduced-motion is active
    - Use `animate` from `framer-motion` for the animation loop
    - _Requirements: 8.5, 8.6, 8.7, 8.8, 17.4_

  - [ ]* 4.5 Write property test for `useAnimatedCounter` counter monotonicity and accuracy (Property 3)
    - **Property 3: Counter Monotonicity and Accuracy**
    - Use `fast-check` to assert that for any finite `to ≥ from`, `value` is monotonically non-decreasing during animation and equals `to` after completion
    - **Validates: Requirements 8.6**

  - [x] 4.6 Create `src/hooks/useMouseParallax.ts`
    - Track `mousemove` with a `requestAnimationFrame` lerp loop (factor 0.06), bounding output to `[-strength, strength]`
    - Return `{ x: 0, y: 0 }` immediately and skip rAF when `useReducedMotion` is active
    - Cancel rAF and remove listener on unmount
    - _Requirements: 8.2, 8.3, 8.4, 17.5_

  - [x] 4.7 Create `src/hooks/useKeyboardNav.ts`
    - Return a memoized `keydown` handler for `Enter`, `Escape`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`
    - Call `e.preventDefault()` for each handled key; ignore all others
    - _Requirements: 8.9_

  - [ ]* 4.8 Write property test for mouse position normalization (Property 4)
    - **Property 4: Mouse Position Normalization**
    - Use `fast-check` to assert that for any `(clientX, clientY, width, height, strength)`, the normalized output satisfies `x = (clientX/W - 0.5) * 2` and `|x| ≤ strength`, `|y| ≤ strength`
    - **Validates: Requirements 7.2, 8.2**

- [ ] 5. Build the MouseTracker context
  - [x] 5.1 Create `src/contexts/MouseTrackerContext.tsx`
    - `MouseTrackerProvider` registers exactly one `{ passive: true }` `mousemove` listener on `window`
    - Drive updates via a single `requestAnimationFrame` loop applying lerp factor 0.06
    - Expose `{ x, y, rawX, rawY }` where `x, y ∈ [-1, 1]`
    - Cancel rAF and remove listener on unmount
    - Export `useMouseTracker()` hook
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 21.2_

- [ ] 6. Build animation UI components
  - [~] 6.1 Create `src/components/ui/animation/ScrollAnimationWrapper.tsx`
    - Accept `variant`, `delay`, `threshold`, `once`, `className`, and `as` props
    - Use `useScrollAnimation` for intersection detection and apply the selected `ANIMATION_VARIANTS` entry
    - Log a `console.warn` and render children without animation when `variant` is unknown
    - Skip animation entirely (render in `visible` state) when `useReducedMotion` is active
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 4.5_

  - [~] 6.2 Create `src/components/ui/animation/StaggerContainer.tsx` with `StaggerItem`
    - `StaggerContainer` uses `whileInView` with `staggerChildren: 0.08` and `delayChildren: 0.1`
    - `StaggerItem` animates from `{ opacity: 0, y: 24 }` to `{ opacity: 1, y: 0 }` over 0.5s
    - _Requirements: 5.5, 5.6_

  - [~] 6.3 Create `src/components/ui/animation/PageTransition.tsx`
    - Wrap children in `AnimatePresence mode="wait"` keyed on `usePathname()`
    - Exit animation: `{ opacity: 0, y: -8 }` over 0.25s; enter: `{ opacity: 0, y: 12 }` → `{ opacity: 1, y: 0 }` over 0.35s
    - When `useReducedMotion` is active, use `initial={false}` and zero transition duration
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 17.6_

  - [~] 6.4 Create `src/components/ui/animation/ScrollProgress.tsx`
    - Use `useScroll()` → `scrollYProgress` smoothed via `useSpring({ stiffness: 100, damping: 30, restDelta: 0.001 })`
    - Render a `fixed top-0` full-width bar (height `0.5` / 2px) with `z-[100]` and amber gradient; `aria-hidden="true"`
    - _Requirements: 13.1, 13.2, 13.3_

  - [~] 6.5 Create `src/components/ui/animation/ParallaxLayer.tsx`
    - Accept `speed` (default 0.2) and map `scrollYProgress [0,1]` to `y: [-speed*80px, speed*80px]`
    - Apply zero y-translation when `useReducedMotion` is active
    - _Requirements: 14.1, 14.3, 17.7_

  - [~] 6.6 Create `src/components/ui/animation/TiltCard.tsx`
    - Track pointer position within card bounds and compute `rotateX`/`rotateY` bounded by `±intensity` degrees (default 8°)
    - Use `useSpring` with stiffness 300 and damping 30; spring back to 0 on mouse leave
    - Apply no 3D transforms when `useReducedMotion` is active
    - _Requirements: 15.1, 15.2, 15.3, 17.8_

  - [~] 6.7 Create `src/components/ui/animation/FlickerText.tsx`
    - Animate opacity through `[1, 0.85, 1, 0.9, 1, 0.75, 1]` over 0.6s with `repeatDelay: 4` and `repeat: Infinity`
    - Render children with no animation when `useReducedMotion` is active
    - _Requirements: 12.1, 12.2, 17.9_

  - [~] 6.8 Create `src/components/ui/animation/TextReveal.tsx`
    - Split `text` into individual characters and animate each from `{ opacity: 0, y: 16 }` to `{ opacity: 1, y: 0 }` with 0.025s stagger, triggered `whileInView once`
    - Set `aria-label={text}` on the container; `aria-hidden="true"` on each character `span`
    - Render plain `<span>{text}</span>` when `useReducedMotion` is active
    - _Requirements: 12.3, 12.4, 12.5, 17.10_

- [~] 7. Checkpoint — wire foundation together
  - Mount `MouseTrackerProvider`, `PageTransition`, and `ScrollProgress` in `src/app/layout.tsx`
  - `MouseTrackerProvider` wraps body content; `PageTransition` wraps `{children}`; `ScrollProgress` is a sibling before children
  - Verify dev server starts without errors and scroll progress bar is visible
  - _Requirements: 7.5, 6.1, 13.4_
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Implement Web Vitals reporting
  - [~] 8.1 Create `src/lib/web-vitals.ts` with `reportWebVitals` function
    - Log `[Web Vitals] name: value` in development
    - Send beacon to `/api/vitals` with `{ name, value, rating, id }` in production
    - _Requirements: 20.1, 20.2, 20.3_

  - [~] 8.2 Create `src/instrumentation.ts` registration file
    - Export `register()` that dynamically imports `web-vitals` and hooks `onCLS`, `onFCP`, `onLCP`, `onTTFB`, `onINP` to `reportWebVitals`
    - _Requirements: 20.1_

  - [~] 8.3 Create `/api/vitals` route handler at `src/app/api/vitals/route.ts`
    - Accept `POST` requests with JSON body `{ name, value, rating, id }`
    - Return `200 OK`; log or forward to analytics as appropriate
    - _Requirements: 20.3_

- [ ] 9. Add Hero section entrance animations and counters
  - [~] 9.1 Animate `h1`, subheading, and floating badge in `HeroSection.tsx`
    - Wrap `<h1>` in `motion.h1` with `initial={{ opacity: 0, y: 40 }}` → `animate={{ opacity: 1, y: 0 }}`, duration 0.7s, delay 0.1s
    - Wrap subheading `<p>` in `motion.p` with `initial={{ opacity: 0, y: 24 }}` → duration 0.6s, delay 0.25s
    - Wrap the floating badge `<div>` in `motion.div` with `animate={{ y: [0, -8, 0] }}`, duration 5s, `repeat: Infinity, ease: 'easeInOut'`
    - _Requirements: 9.1, 9.2, 9.6_

  - [~] 9.2 Wrap four CTA segment cards with `StaggerContainer`, `StaggerItem`, `TiltCard`, and hover spring
    - Replace the raw `grid` wrapper with `<StaggerContainer className="grid ...">` and wrap each card in `<StaggerItem>`
    - Wrap each card in `<TiltCard>` for 3D perspective tilt
    - Apply `whileHover={{ y: -6, scale: 1.02 }}` and `whileTap={{ scale: 0.97 }}` with spring stiffness 400, damping 25
    - _Requirements: 9.3, 9.4, 9.5, 9.8, 18.1_

  - [~] 9.3 Animate metric banner counters with `useAnimatedCounter`
    - Replace static metric values with `useAnimatedCounter` instances (revenue ₹203 Cr, capacity 180,000 TPA, margin 2.42%, scale ₹1,000 Cr)
    - Use `useScrollAnimation({ threshold: 0.5 })` on the banner ref and call `start()` on each counter when `isInView` becomes true
    - _Requirements: 9.7_

  - [~] 9.4 Wrap hero ambient glow elements in `ParallaxLayer`
    - Wrap each `ambient-liquid-glow` div in `<ParallaxLayer speed={0.15} className="absolute inset-0 pointer-events-none">`
    - _Requirements: 14.2_

- [ ] 10. Add Header scroll and navigation animations
  - [~] 10.1 Add scroll-aware backdrop blur and active nav pill to `Header.tsx`
    - Import `useScroll`, `useTransform` from `framer-motion`; compute `headerBlur` from `scrollY [0, 80] → [16, 28]`
    - Convert `<header>` to `<motion.header>` and apply the blur transform via `style`
    - Replace the active nav link `<Link>` styling with a `motion.span layoutId="nav-active-pill"` rendered when `isActive`, using spring stiffness 380, damping 30
    - _Requirements: 10.1, 10.2_

  - [~] 10.2 Replace CSS-animated mobile menu drawer with Framer Motion `AnimatePresence`
    - Remove `animate-in slide-in-from-top` Tailwind class from the mobile menu div
    - Wrap mobile menu render in `<AnimatePresence>` and add `motion.div` with enter `{ opacity: 0, y: -16, scale: 0.97 }` → `{ opacity: 1, y: 0, scale: 1 }` spring (stiffness 350, damping 30)
    - Add exit `{ opacity: 0, y: -12, scale: 0.97 }`
    - _Requirements: 10.3, 10.4_

- [ ] 11. Add ProductHub animations
  - [~] 11.1 Wrap product cards in `StaggerContainer` and add 3D viewer expand/collapse animation
    - Wrap the product card grid with `<StaggerContainer>` and each card in `<StaggerItem>`
    - Replace any CSS transition on the 3D viewer toggle with `<AnimatePresence>` + `motion.div` animating `{ height: 0, opacity: 0 }` → `{ height: 320, opacity: 1 }` over 0.4s
    - Add keyboard `Tab` + `Enter` accessibility to the toggle
    - _Requirements: 11.1, 11.2, 18.3_

  - [~] 11.2 Add spring entrance animation to the product detail modal
    - Wrap the modal backdrop in `motion.div` with `initial={{ opacity: 0 }}` → `animate={{ opacity: 1 }}`
    - Wrap the modal panel in `motion.div` with `initial={{ opacity: 0, scale: 0.94, y: 20 }}` → spring stiffness 300, damping 28
    - _Requirements: 11.3_

- [ ] 12. Add GrowthTimeline animations
  - [~] 12.1 Add SVG path draw-in and milestone dot spring stagger to `GrowthTimeline`
    - Apply `initial={{ pathLength: 0 }}` → `whileInView={{ pathLength: 1 }}` over 2.5s with `viewport={{ once: true, amount: 0.3 }}` to the SVG `<motion.path>`
    - Apply per-milestone `motion.circle` with `initial={{ scale: 0, opacity: 0 }}` → `whileInView spring` at stiffness 400, each delayed by `index * 0.3s`
    - _Requirements: 11.4, 11.5_

  - [~] 12.2 Add `useAnimatedCounter` revenue counters to `GrowthTimeline`
    - Replace static FY milestone numbers (FY26 ₹203 Cr through FY30 ₹1,006 Cr) with `useAnimatedCounter` instances with custom formatters and durations between 1.8s–2.5s
    - Start counters when the milestone enters view using `useScrollAnimation`
    - _Requirements: 11.6_

- [ ] 13. Add TrustSection, ContactSection, InquiryForm, and Footer animations
  - [~] 13.1 Add badge stagger and stat counter to `TrustSection`
    - Wrap certification badges in `<StaggerContainer>` + `<StaggerItem>` with `whileHover={{ scale: 1.06, rotate: 1 }}` spring (stiffness 500, damping 20)
    - Replace static "98.5%" stat with `useAnimatedCounter({ to: 98.5, decimals: 1, duration: 2.0 })` triggered on scroll
    - _Requirements: 11.7, 11.8_

  - [~] 13.2 Add card hover micro-animations to `ContactSection`
    - Convert contact card wrappers to `motion.div` with `whileHover={{ y: -8 }}` and amber box-shadow, spring stiffness 350, damping 25
    - _Requirements: 11.9_

  - [~] 13.3 Add step-slide transition to `InquiryForm`
    - Wrap the current-step render in `<AnimatePresence mode="wait">` + `motion.div` keyed on `currentStep`
    - Exit: `{ opacity: 0, x: -30 }` over 0.3s; enter: from `{ opacity: 0, x: 40 }` over 0.3s
    - _Requirements: 11.10_

  - [~] 13.4 Add underline draw animation to `Footer` links
    - Wrap each footer `<a>` in `motion.a whileHover="hover"` and add a child `motion.span` with `variants={{ initial: { scaleX: 0, originX: 0 }, hover: { scaleX: 1 } }}` over 0.25s
    - _Requirements: 11.11_

- [~] 14. Checkpoint — all sections animated
  - Verify all section animations render in the browser without console errors
  - Confirm reduced-motion behavior: toggle `prefers-reduced-motion: reduce` in browser DevTools and assert all animations are suppressed
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Enhance Three.js canvas components
  - [~] 15.1 Refactor `SteelHeroCanvas` to use `MouseTrackerContext` and add keyboard nudge
    - Remove `window.addEventListener('mousemove', handleMouseMove)` and consume `const { x: mouseX, y: mouseY } = useMouseTracker()` instead
    - Add a `targetRef.current` for keyboard-driven nudge: `useEffect` registers a `keydown` listener on the container element that adds `±0.05` to target rotation per arrow key press
    - Add `aria-label="Interactive 3D steel product visualization"` and `tabIndex={0}` to the container `div`
    - Update the rAF loop to read from `targetRef` for keyboard offset plus context mouse position
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 18.2_

  - [~] 15.2 Add scroll-driven multiplier to `SteelSparksCanvas`
    - Add `scroll` event listener (passive) that computes `scrollMultiplier ∈ [0.2, 2.5]` based on the growth section's `getBoundingClientRect()`
    - Scale particle y-velocities by `scrollMultiplier.current` each rAF tick
    - Remove listener on cleanup
    - _Requirements: 16.5, 16.6_

  - [~] 15.3 Verify Three.js cleanup completeness across all three canvas components
    - Audit `SteelHeroCanvas`, `SteelSparksCanvas`, and `SteelProductViewer` cleanup functions
    - Ensure each cancels its rAF, removes all event listeners, disposes every geometry and material, and calls `renderer.dispose()`
    - _Requirements: 16.7_

  - [~] 15.4 Create `WebGLErrorBoundary` component and wrap all Three.js canvases
    - Create `src/components/3d/WebGLErrorBoundary.tsx` as a React class component error boundary
    - Render a static CSS gradient background matching the canvas colors when the boundary catches an error (WebGL unavailable or initialization failure)
    - Wrap `SteelHeroCanvas`, `SteelSparksCanvas`, and `SteelProductViewer` in `<WebGLErrorBoundary>` at their usage sites
    - _Requirements: 16.8_

- [ ] 16. Write property-based tests
  - [~] 16.1 Set up `fast-check` and write property tests for mouse normalization (Property 4) and counter behavior (Property 3)
    - Install `fast-check` as a dev dependency
    - Create `src/lib/__tests__/mouseNormalization.test.ts`
      - **Property 4: Mouse Position Normalization** — use `fc.property(fc.float, fc.float, fc.float, fc.float, fc.float)` to assert `|x| ≤ strength` and `|y| ≤ strength` for all inputs
      - **Validates: Requirements 7.2, 8.2**
    - Create `src/hooks/__tests__/useAnimatedCounter.test.ts`
      - **Property 3: Counter Monotonicity and Accuracy** — assert monotonically non-decreasing values and `value === to` after completion for arbitrary `from`/`to` pairs
      - **Validates: Requirements 8.6**

  - [ ]* 16.2 Write unit tests for `useKeyboardNav` correctness
    - Test all six key handlers call their callback exactly once and `e.preventDefault()` is invoked
    - Test unhandled keys do not call any callback and do not call `e.preventDefault()`
    - _Requirements: 8.9_

  - [ ]* 16.3 Write unit tests for `ScrollAnimationWrapper` unknown-variant warning
    - Assert a `console.warn` is emitted when an unrecognized variant name is passed
    - Assert children still render without animation
    - _Requirements: 4.5_

- [~] 17. Final checkpoint — full integration verification
  - Run `npm run build` (or `next build`) and confirm it completes without errors
  - Verify `ANALYZE=true npm run build` opens the bundle analyzer and `vendor-three` and `vendor-framer` chunks appear as separate async chunks
  - Confirm no hydration mismatch errors appear in the browser console on first load
  - Confirm the `ScrollProgress` bar, `PageTransition`, and `MouseTrackerProvider` are all active
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- The design document is in TypeScript throughout — all new files must use `.tsx` / `.ts`
- `fast-check` must be added as a dev dependency before task 16.1 can run
- The `web-vitals` package is not currently in `package.json` — install it before task 8.1 (`npm install web-vitals`)
- Checkpoints (tasks 7, 14, 17) are integration gates — do not skip them
- All animation keyframes must use only `transform` and `opacity` to stay on the compositor thread (Requirement 19.9)
- Property tests validate universal correctness guarantees from the design's "Correctness Properties" section

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "4.1", "4.2"] },
    { "id": 1, "tasks": ["2.1", "4.3", "4.4", "4.6", "4.7"] },
    { "id": 2, "tasks": ["2.2", "3.1", "4.5", "4.8", "5.1"] },
    { "id": 3, "tasks": ["3.2", "3.3", "6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8"] },
    { "id": 4, "tasks": ["8.1", "8.2", "8.3", "9.1", "9.2", "9.3", "9.4", "10.1", "10.2", "11.1", "11.2", "12.1", "12.2", "13.1", "13.2", "13.3", "13.4"] },
    { "id": 5, "tasks": ["15.1", "15.2", "15.3", "15.4"] },
    { "id": 6, "tasks": ["16.1", "16.2", "16.3"] }
  ]
}
```
