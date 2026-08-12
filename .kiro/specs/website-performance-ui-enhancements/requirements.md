# Requirements Document

## Introduction

This document defines the formal requirements for the Website Performance & UI Enhancements feature for the Shree Balaji Rolling Mills website. The feature spans three pillars: **build and bundle performance** (Turbopack + Next.js configuration), **skeleton loading system** (perceived performance through layout-matched placeholders), and **dynamic interactive UI** (scroll animations, mouse parallax, counter animations, page transitions, Three.js canvas interactivity, and text effects). The site runs on Next.js 16.3, React 19, Framer Motion 13, Three.js, and Tailwind CSS v4.

All enhancements must integrate with the existing three Three.js canvas components (`SteelHeroCanvas`, `SteelProductViewer`, `SteelSparksCanvas`), the existing design token system, and the App Router layout conventions already in place.

---

## Glossary

- **Animation_System**: The collection of Framer Motion–based components and hooks (`ScrollAnimationWrapper`, `StaggerContainer`, `PageTransition`, `ParallaxLayer`, `TiltCard`, `FlickerText`, `TextReveal`) responsible for entrance, scroll, and interactive animations.
- **Bundle_Splitter**: The webpack `splitChunks` configuration in `next.config.ts` that produces isolated `vendor-three` and `vendor-framer` async chunks.
- **CLS**: Cumulative Layout Shift — a Core Web Vital measuring unexpected visual layout movement.
- **FCP**: First Contentful Paint — time from navigation start to when any content is first rendered.
- **LCP**: Largest Contentful Paint — time until the largest above-fold content element is rendered.
- **MouseTracker**: The `MouseTrackerContext` and `MouseTrackerProvider` that centralize normalized mouse position at up to 60 fps via a single `requestAnimationFrame` loop.
- **ReducedMotion**: The system-level `prefers-reduced-motion: reduce` media query, surfaced to components via Framer Motion's `useReducedMotion` hook.
- **Skeleton_System**: The set of layout-matched placeholder components (`SkeletonBase`, `HeroSectionSkeleton`, `ProductHubSkeleton`, `GrowthTimelineSkeleton`, `InquiryFormSkeleton`, `TrustSectionSkeleton`, `ContactSectionSkeleton`) rendered inside React Suspense boundaries while chunks load.
- **TTI**: Time to Interactive — time until the page is reliably interactive.
- **Turbopack**: The Rust-based Next.js dev bundler enabled via the `turbopack` block in `next.config.ts`.
- **Web_Vitals_Reporter**: The `reportWebVitals` utility and `instrumentation.ts` registration that captures CLS, FCP, LCP, TTFB, and INP metrics and forwards them to an analytics endpoint in production.

---

## Requirements

### Requirement 1: Next.js Configuration & Turbopack

**User Story:** As a developer, I want the Next.js build configuration optimized for performance, so that development iteration is fast and production bundles meet the defined size budgets.

#### Acceptance Criteria

1. THE Next.js_Config SHALL enable Turbopack for the development server with an `@` alias resolving to `./src`, matching the existing TypeScript path configuration.
2. WHEN a production build is executed, THE Bundle_Splitter SHALL isolate Three.js and `@types/three` into an async chunk named `vendor-three` with priority 30.
3. WHEN a production build is executed, THE Bundle_Splitter SHALL isolate `framer-motion` into an async chunk named `vendor-framer` with priority 25.
4. WHEN a production build is executed, THE Bundle_Splitter SHALL group all remaining `node_modules` into a `vendors` chunk with priority 10.
5. THE Next.js_Config SHALL configure the image optimizer to serve `image/avif` before `image/webp`, with `deviceSizes` of `[640, 750, 828, 1080, 1200, 1920]` and a minimum cache TTL of 30 days.
6. THE Next.js_Config SHALL apply a `Cache-Control: public, max-age=31536000, immutable` response header to all static image assets (`svg`, `jpg`, `jpeg`, `png`, `webp`, `avif`, `gif`, `ico`) and all `/_next/static/` paths.
7. WHEN `NODE_ENV` is `production`, THE Next.js_Config SHALL configure the SWC compiler to remove `console.log` calls while preserving `console.error` and `console.warn`.
8. THE Next.js_Config SHALL enable `optimizePackageImports` for `lucide-react` and `framer-motion` to eliminate barrel-import penalties.
9. THE Next.js_Config SHALL enable `optimizeCss` to inline critical above-fold CSS and remove render-blocking stylesheet requests.

---

### Requirement 2: Dynamic Import Strategy

**User Story:** As a site visitor, I want the initial page to load quickly, so that I see above-fold content without waiting for heavy libraries to download.

#### Acceptance Criteria

1. THE Next.js_Config SHALL load `SteelHeroCanvas`, `SteelSparksCanvas`, and `SteelProductViewer` via `next/dynamic` with `ssr: false` so Three.js never blocks the initial server render.
2. THE Next.js_Config SHALL load `GrowthTimeline` and `InquiryForm` via `next/dynamic` with SSR enabled but code-split from the initial bundle.
3. WHEN a page renders on the server, THE Skeleton_System SHALL fill the Suspense boundary for each dynamically imported section so the user sees a layout-matched placeholder immediately.
4. WHEN the `vendor-three` chunk has not been downloaded, THE Application SHALL not load that chunk on any page that renders no Three.js canvas component.

---

### Requirement 3: Skeleton Loader System

**User Story:** As a site visitor, I want to see correctly sized placeholder content while sections load, so that the page layout does not shift and loading feels fast.

#### Acceptance Criteria

1. THE `SkeletonBase` component SHALL accept `variant` (`text` | `rect` | `circle`), `className`, and `animate` props and render a `role="status"` element with `aria-label="Loading..."`.
2. WHILE `animate` is `true` and `prefers-reduced-motion` is not active, THE `SkeletonBase` SHALL apply a `shimmer` CSS animation cycling background-position over 1.6 seconds.
3. IF `prefers-reduced-motion: reduce` is detected, THEN THE `SkeletonBase` SHALL render a static fill with no animation.
4. THE `HeroSectionSkeleton` SHALL render a layout matching the hero section with a badge placeholder, three heading lines, four card placeholders in a responsive grid, and a metric banner placeholder.
5. THE `ProductHubSkeleton` SHALL render a layout matching the product hub with a heading block and two full-height card placeholders in a two-column grid.
6. THE `GrowthTimelineSkeleton`, `InquiryFormSkeleton`, `TrustSectionSkeleton`, `ContactSectionSkeleton`, and a footer skeleton SHALL each mirror their respective real component's dimensions to within ±2px, preventing measurable CLS.
7. WHEN real content mounts and replaces a skeleton, THE Application SHALL produce a CLS score contribution of 0 for that transition.

---

### Requirement 4: Animation Variant Catalog

**User Story:** As a developer, I want a centralized set of animation variants, so that all entrance animations are visually consistent across every section.

#### Acceptance Criteria

1. THE `animation-variants.ts` module SHALL export an `ANIMATION_VARIANTS` record containing at minimum the variants `fadeUp`, `fadeIn`, `slideLeft`, `slideRight`, and `scaleIn`, each with `hidden`, `visible`, and `transition` fields.
2. THE `fadeUp` variant SHALL animate from `{ opacity: 0, y: 32 }` to `{ opacity: 1, y: 0 }` with duration 0.55s and cubic-bezier easing `[0.16, 1, 0.3, 1]`.
3. THE `slideLeft` and `slideRight` variants SHALL animate from `{ opacity: 0, x: ±40 }` to `{ opacity: 1, x: 0 }` with duration 0.5s and cubic-bezier easing `[0.16, 1, 0.3, 1]`.
4. THE `scaleIn` variant SHALL animate from `{ opacity: 0, scale: 0.92 }` to `{ opacity: 1, scale: 1 }` with duration 0.5s and cubic-bezier easing `[0.16, 1, 0.3, 1]`.
5. WHEN an unknown variant name is passed to `ScrollAnimationWrapper`, THE `ScrollAnimationWrapper` SHALL log a console warning and render children without animation.

---

### Requirement 5: ScrollAnimationWrapper Component

**User Story:** As a developer, I want a reusable scroll-triggered entrance wrapper, so that any section can animate in when it enters the viewport without custom per-component code.

#### Acceptance Criteria

1. THE `ScrollAnimationWrapper` SHALL accept `variant`, `delay`, `threshold`, `once`, `className`, and `as` props and apply the selected `ANIMATION_VARIANTS` entry via Framer Motion.
2. WHEN the wrapped element's intersection with the viewport crosses `threshold` (default 0.15), THE `ScrollAnimationWrapper` SHALL transition from the `hidden` state to the `visible` state.
3. WHILE `once` is `true` (the default), THE `ScrollAnimationWrapper` SHALL not revert to the `hidden` state after the element has animated in.
4. IF `prefers-reduced-motion` is detected, THEN THE `ScrollAnimationWrapper` SHALL render children in the `visible` state immediately with no transition duration.
5. THE `StaggerContainer` component SHALL stagger child entrance animations with 80ms between each child and a 100ms initial delay, using `whileInView` with `once: true`.
6. WHEN a `StaggerItem` is a child of `StaggerContainer`, THE `StaggerItem` SHALL animate from `{ opacity: 0, y: 24 }` to `{ opacity: 1, y: 0 }` with duration 0.5s.

---

### Requirement 6: Page Transition System

**User Story:** As a site visitor, I want smooth animated transitions between pages, so that navigation feels polished and contextual.

#### Acceptance Criteria

1. THE `PageTransition` component SHALL wrap the `{children}` slot in `src/app/layout.tsx` and use Framer Motion `AnimatePresence` with `mode="wait"`.
2. WHEN the pathname changes, THE `PageTransition` SHALL animate the exiting page to `{ opacity: 0, y: -8 }` over 0.25s before the entering page begins its animation.
3. WHEN a new page enters, THE `PageTransition` SHALL animate it from `{ opacity: 0, y: 12 }` to `{ opacity: 1, y: 0 }` over 0.35s with easing `[0.16, 1, 0.3, 1]`.
4. WHEN a route change occurs, THE Application SHALL never display a blank screen between the exit and entrance animations.
5. IF `prefers-reduced-motion` is detected, THEN THE `PageTransition` SHALL transition instantly with no `y` movement or duration greater than 0.

---

### Requirement 7: MouseTracker Context

**User Story:** As a developer, I want a single centralized mouse position provider, so that multiple canvas and parallax components share one event listener instead of registering their own.

#### Acceptance Criteria

1. THE `MouseTrackerProvider` SHALL register exactly one `mousemove` event listener on `window` with `{ passive: true }` and drive updates via a single `requestAnimationFrame` loop.
2. THE `MouseTrackerProvider` SHALL expose normalized `x` and `y` values in the range `[-1, 1]` and raw `rawX` / `rawY` values, all updated at a maximum rate of 60 fps.
3. THE `MouseTrackerProvider` SHALL apply a lerp factor of 0.06 per frame so that position approaches the cursor smoothly rather than jumping.
4. WHEN the `MouseTrackerProvider` unmounts, THE Provider SHALL cancel the active `requestAnimationFrame` and remove the `mousemove` event listener.
5. THE `MouseTrackerProvider` SHALL be mounted in `src/app/layout.tsx` wrapping the body content so all child components can consume `useMouseTracker()`.

---

### Requirement 8: Custom Hooks

**User Story:** As a developer, I want reusable animation hooks, so that scroll detection, mouse parallax, counter animation, and keyboard navigation logic can be shared without duplication.

#### Acceptance Criteria

1. THE `useScrollAnimation` hook SHALL return a `ref` and an `isInView` boolean, using Framer Motion's `useInView` with the supplied `threshold` (default 0.15), `once` (default `true`), and `margin` (default `'-50px'`) options.
2. THE `useMouseParallax` hook SHALL return `{ x, y }` where both values are bounded within `[-strength, strength]`, updating via a `requestAnimationFrame` loop with lerp factor 0.06.
3. IF `prefers-reduced-motion` is detected, THEN THE `useMouseParallax` hook SHALL return `{ x: 0, y: 0 }` immediately and skip registering the `mousemove` listener and `requestAnimationFrame` loop.
4. WHEN `useMouseParallax` unmounts, THE Hook SHALL cancel the `requestAnimationFrame` and remove the `mousemove` event listener from `window`.
5. THE `useAnimatedCounter` hook SHALL accept `from`, `to`, `duration`, `decimals`, `easing`, `format`, and `startOnMount` props and expose a `start()` method, a numeric `value`, and a formatted `display` string.
6. WHEN `start()` is called on `useAnimatedCounter`, THE Hook SHALL animate `value` from `from` toward `to` monotonically over `duration` seconds, with `value` equaling `to` upon completion.
7. WHEN `start()` is called while a previous animation is still running, THE `useAnimatedCounter` Hook SHALL stop the previous animation before starting the new one.
8. IF `prefers-reduced-motion` is detected, THEN `useAnimatedCounter` SHALL set `value` to `to` immediately upon `start()` with no animation.
9. THE `useKeyboardNav` hook SHALL return a `keydown` event handler that calls the appropriate callback for `Enter`, `Escape`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, and `ArrowRight` keys and calls `e.preventDefault()` for each handled key.
10. THE `useReducedMotion` hook SHALL re-export `useReducedMotion` from `framer-motion` as a named export from `src/hooks/useReducedMotion.ts`.

---

### Requirement 9: Hero Section Animations

**User Story:** As a site visitor, I want the hero section to animate in on first load and respond to hover and scroll interactions, so that the page feels alive and draws attention to key content.

#### Acceptance Criteria

1. WHEN the hero section first mounts, THE `HeroSection` SHALL animate the `h1` from `{ opacity: 0, y: 40 }` to `{ opacity: 1, y: 0 }` over 0.7s with a 0.1s delay.
2. WHEN the hero section first mounts, THE `HeroSection` SHALL animate the subheading from `{ opacity: 0, y: 24 }` to `{ opacity: 1, y: 0 }` over 0.6s with a 0.25s delay.
3. THE four CTA segment cards SHALL be wrapped in `StaggerContainer` and animate in sequentially with 80ms stagger.
4. WHEN a CTA segment card is hovered, THE Card SHALL spring-animate to `{ y: -6, scale: 1.02 }` using spring stiffness 400 and damping 25.
5. WHEN a CTA segment card is pressed, THE Card SHALL spring-animate to `{ scale: 0.97 }`.
6. THE floating badge element SHALL animate on a repeating `y` oscillation of `[0, -8, 0]` over 5 seconds with `easeInOut`.
7. WHEN the metric banner scrolls into view with at least 50% visibility, THE `HeroSection` SHALL call `start()` on each `useAnimatedCounter` instance to begin the number roll animation.
8. THE four CTA cards SHALL be wrapped in `TiltCard` to enable 3D perspective tilt on mouse hover.

---

### Requirement 10: Header Animations

**User Story:** As a site visitor, I want the header to respond to scroll position and provide smooth navigation feedback, so that navigation feels responsive and polished.

#### Acceptance Criteria

1. WHEN the user scrolls between 0 and 80px, THE `Header` SHALL interpolate its backdrop-blur from 16px to 28px using `useTransform` on `scrollY`.
2. WHEN the active navigation route matches a nav link, THE `Header` SHALL render a shared layout animation pill using Framer Motion `layoutId="nav-active-pill"` with spring stiffness 380 and damping 30.
3. WHEN the mobile menu is opened, THE `Header` SHALL animate the menu drawer in from `{ opacity: 0, y: -16, scale: 0.97 }` to `{ opacity: 1, y: 0, scale: 1 }` using a spring with stiffness 350 and damping 30.
4. WHEN the mobile menu is closed, THE `Header` SHALL animate the drawer out to `{ opacity: 0, y: -12, scale: 0.97 }` via `AnimatePresence`.

---

### Requirement 11: Product Hub, Growth Timeline, Trust, Contact & Footer Animations

**User Story:** As a site visitor, I want all major content sections to have consistent scroll-triggered entrance animations and interactive hover states, so that the browsing experience feels cohesive and engaging.

#### Acceptance Criteria

1. THE `ProductHub` product cards SHALL be wrapped in `StaggerContainer` so they animate in sequentially on scroll.
2. WHEN a user activates the 3D viewer toggle for a product card, THE `ProductHub` SHALL animate the viewer container from `{ height: 0, opacity: 0 }` to `{ height: 320, opacity: 1 }` over 0.4s.
3. WHEN the product detail modal is opened, THE `ProductHub` SHALL animate the backdrop to `{ opacity: 1 }` and the modal panel from `{ opacity: 0, scale: 0.94, y: 20 }` to `{ opacity: 1, scale: 1, y: 0 }` using a spring with stiffness 300 and damping 28.
4. WHEN the `GrowthTimeline` SVG path enters the viewport with at least 30% visibility, THE `GrowthTimeline` SHALL animate `pathLength` from 0 to 1 over 2.5s.
5. WHEN each milestone dot on the `GrowthTimeline` enters view, THE `GrowthTimeline` SHALL animate the dot from `{ scale: 0, opacity: 0 }` to `{ scale: 1, opacity: 1 }` with a spring at stiffness 400, staggered by `index * 0.3s`.
6. THE revenue milestone counters in `GrowthTimeline` SHALL use `useAnimatedCounter` with formatters producing values such as `₹203 Cr` and custom durations between 1.8s and 2.5s.
7. THE `TrustSection` certification badges SHALL be wrapped in `StaggerContainer` and each badge SHALL spring-animate to `{ scale: 1.06, rotate: 1 }` on hover with stiffness 500 and damping 20.
8. THE `TrustSection` stat number (e.g., "98.5% dispatch SLA") SHALL use `useAnimatedCounter` with `decimals: 1` and duration 2.0s, starting when the stat scrolls into view.
9. WHEN a `ContactSection` card is hovered, THE Card SHALL spring-animate to `{ y: -8 }` with an amber box-shadow using stiffness 350 and damping 25.
10. THE `InquiryForm` multi-step form SHALL animate each step transition: the exiting step slides to `{ opacity: 0, x: -30 }` and the entering step slides in from `{ opacity: 0, x: 40 }`, both over 0.3s.
11. THE `Footer` link elements SHALL render an underline `span` that animates `scaleX` from 0 to 1 on hover over 0.25s using `originX: 0`.

---

### Requirement 12: Text Effects

**User Story:** As a site visitor, I want hero and section headings to use subtle text reveal and flickering effects, so that the content has a premium, industrial feel matching the brand.

#### Acceptance Criteria

1. THE `FlickerText` component SHALL animate opacity through the sequence `[1, 0.85, 1, 0.9, 1, 0.75, 1]` over 0.6s, repeating with a 4-second delay between each cycle.
2. IF `prefers-reduced-motion` is detected, THEN THE `FlickerText` component SHALL render its children with no opacity animation.
3. THE `TextReveal` component SHALL split its `text` prop into individual characters and animate each from `{ opacity: 0, y: 16 }` to `{ opacity: 1, y: 0 }` with 0.025s stagger and 0.3s per character, triggered `whileInView` with `once: true`.
4. THE `TextReveal` component SHALL set `aria-label` on the container element equal to the full `text` prop and `aria-hidden="true"` on each individual character `span`, so screen readers announce the complete text once.
5. IF `prefers-reduced-motion` is detected, THEN THE `TextReveal` component SHALL render the text as a plain `<span>` with no character animation.

---

### Requirement 13: Scroll Progress Indicator

**User Story:** As a site visitor, I want a visual scroll progress indicator at the top of the viewport, so that I know how far through the page content I have read.

#### Acceptance Criteria

1. THE `ScrollProgress` component SHALL render a fixed, full-width bar at the top of the viewport (`z-index: 100`) with height `0.5` (2px) and an amber gradient from `growth-700` to `growth-500`.
2. THE `ScrollProgress` bar SHALL animate its `scaleX` from 0 to 1 using `useScroll`'s `scrollYProgress` smoothed by a spring with stiffness 100, damping 30, and `restDelta` 0.001.
3. THE `ScrollProgress` bar SHALL have `aria-hidden="true"` so it is not announced by screen readers.
4. THE `ScrollProgress` component SHALL be mounted in `src/app/layout.tsx` so it appears on every page.

---

### Requirement 14: Parallax Section Backgrounds

**User Story:** As a site visitor, I want section background glow elements to shift subtly as I scroll, so that the page has visual depth and a sense of motion.

#### Acceptance Criteria

1. THE `ParallaxLayer` component SHALL accept a `speed` prop (default 0.2) and translate its children along the y-axis using `useScroll` with `offset: ['start end', 'end start']`, mapping scroll progress to `[-speed*80px, +speed*80px]`.
2. THE `ParallaxLayer` component SHALL be applied to the `ambient-liquid-glow` elements in `HeroSection` with `speed={0.15}` and `pointer-events: none`.
3. IF `prefers-reduced-motion` is detected, THEN THE `ParallaxLayer` component SHALL apply zero y-translation regardless of scroll position.

---

### Requirement 15: TiltCard Component

**User Story:** As a site visitor, I want the hero CTA segment cards to tilt in 3D toward my cursor, so that the interaction feels immersive and premium.

#### Acceptance Criteria

1. THE `TiltCard` component SHALL track pointer position within the card bounds and apply `rotateX` and `rotateY` transforms bounded by `±intensity` degrees (default 8°), smoothed by springs with stiffness 300 and damping 30.
2. WHEN the cursor leaves the `TiltCard`, THE Component SHALL spring-animate both rotation axes back to 0.
3. IF `prefers-reduced-motion` is detected, THEN THE `TiltCard` Component SHALL apply no `rotateX`, `rotateY`, or `transformStyle` — rendering as a standard `div`.

---

### Requirement 16: Three.js Canvas Enhancements

**User Story:** As a site visitor, I want the Three.js canvas scenes to respond to mouse movement via the shared MouseTracker, support keyboard navigation, and react to scroll position, so that the 3D visuals are interactive and accessible.

#### Acceptance Criteria

1. THE `SteelHeroCanvas` SHALL consume mouse position from `useMouseTracker()` instead of registering its own `mousemove` listener on `window`.
2. THE `SteelHeroCanvas` animation loop SHALL apply group rotation using `group.rotation.y += (mouseX * 0.3 - group.rotation.y) * 0.05` and `group.rotation.x += (-mouseY * 0.3 - group.rotation.x) * 0.05`.
3. WHEN the `SteelHeroCanvas` container is focused and a user presses `ArrowLeft`, `ArrowRight`, `ArrowUp`, or `ArrowDown`, THE Canvas SHALL nudge the target rotation by ±0.05 radians on the corresponding axis.
4. THE `SteelHeroCanvas` container element SHALL have `aria-label="Interactive 3D steel product visualization"`.
5. THE `SteelSparksCanvas` SHALL listen to the `scroll` event with `{ passive: true }` and compute a `scrollMultiplier` in the range `[0.2, 2.5]` based on the growth section's position relative to the viewport.
6. WHEN the growth section is scrolled through, THE `SteelSparksCanvas` SHALL scale particle y-velocities by the current `scrollMultiplier` to accelerate sparks with scroll depth.
7. WHEN any Three.js canvas component unmounts, THE Component SHALL cancel its `requestAnimationFrame`, remove all event listeners, dispose all `THREE.BufferGeometry` and `THREE.Material` instances, and call `renderer.dispose()`.
8. IF WebGL is unavailable in the browser, THEN a React error boundary SHALL render a static gradient background in place of each Three.js canvas with no broken UI.

---

### Requirement 17: Reduced Motion Compliance

**User Story:** As a site visitor who has enabled reduced-motion in my OS settings, I want all animations to be disabled or minimized, so that I can use the site without vestibular discomfort.

#### Acceptance Criteria

1. THE Animation_System SHALL gate every Framer Motion component that applies `y`, `x`, `scale`, or `rotate` transforms behind a `prefersReducedMotion` check.
2. WHEN `prefers-reduced-motion: reduce` is active, THE Animation_System SHALL render all animated components in their final `visible` state immediately with no transitional motion.
3. WHEN `prefers-reduced-motion: reduce` is active, THE `SkeletonBase` SHALL render a static fill with no shimmer animation.
4. WHEN `prefers-reduced-motion: reduce` is active, THE `useAnimatedCounter` hook SHALL set the counter to its target value immediately upon `start()`.
5. WHEN `prefers-reduced-motion: reduce` is active, THE `useMouseParallax` hook SHALL return `{ x: 0, y: 0 }` and skip the rAF loop.
6. WHEN `prefers-reduced-motion: reduce` is active, THE `PageTransition` SHALL perform an instant route change with no y-offset animation.
7. WHEN `prefers-reduced-motion: reduce` is active, THE `ParallaxLayer` SHALL apply zero y-translation.
8. WHEN `prefers-reduced-motion: reduce` is active, THE `TiltCard` SHALL apply no 3D rotation transforms.
9. WHEN `prefers-reduced-motion: reduce` is active, THE `FlickerText` SHALL render its children without the opacity flicker animation.
10. WHEN `prefers-reduced-motion: reduce` is active, THE `TextReveal` SHALL render the full text string without per-character animation.

---

### Requirement 18: Keyboard Accessibility

**User Story:** As a keyboard-only user, I want all interactive animation triggers to be reachable and activatable via keyboard, so that I can fully use the site without a mouse.

#### Acceptance Criteria

1. THE four CTA segment cards in `HeroSection` SHALL be reachable via the `Tab` key and activatable via `Enter` or `Space`.
2. THE `SteelHeroCanvas` container SHALL be focusable and its keyboard parallax controls (`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`) SHALL be functional when the canvas has focus.
3. THE product cards in `ProductHub` and the 3D viewer toggle SHALL be reachable via `Tab` and activatable via `Enter`.
4. WHILE any interactive element in the Animation_System has keyboard focus, THE Element SHALL display a visible focus ring that meets WCAG 2.1 AA contrast requirements.

---

### Requirement 19: Performance Budgets

**User Story:** As a business stakeholder, I want the website to meet defined Core Web Vitals targets, so that it ranks well in search and loads quickly for visitors on mobile connections.

#### Acceptance Criteria

1. THE Application SHALL achieve an LCP of less than 2.5 seconds on a simulated mobile 4G connection as measured by Lighthouse.
2. THE Application SHALL achieve an FCP of less than 1.5 seconds on a simulated mobile 4G connection as measured by Lighthouse.
3. THE Application SHALL maintain a CLS score below 0.05 as measured by Web Vitals tooling.
4. THE Application SHALL achieve a TTI of less than 3.5 seconds as measured by Lighthouse.
5. THE Application's total JavaScript payload (gzip) SHALL be less than 150 KB.
6. THE `vendor-three` chunk (gzip) SHALL be less than 90 KB.
7. THE `vendor-framer` chunk (gzip) SHALL be less than 30 KB.
8. THE Application SHALL achieve a Lighthouse performance score of 90 or higher.
9. THE Animation_System SHALL apply only `transform` and `opacity` CSS properties in all animation keyframes so that all animation work executes on the compositor thread without triggering layout or paint.

---

### Requirement 20: Web Vitals Reporting

**User Story:** As a developer, I want Core Web Vitals metrics collected and forwarded to an analytics endpoint in production, so that performance regressions are detected in real-user data.

#### Acceptance Criteria

1. THE `Web_Vitals_Reporter` SHALL capture CLS, FCP, LCP, TTFB, and INP metrics using the `web-vitals` library via `src/instrumentation.ts`.
2. WHEN `NODE_ENV` is `development`, THE `Web_Vitals_Reporter` SHALL log each metric name and rounded value to `console.log`.
3. WHEN `NODE_ENV` is `production`, THE `Web_Vitals_Reporter` SHALL send each metric's `name`, `value`, `rating`, and `id` to `/api/vitals` via `navigator.sendBeacon`.

---

### Requirement 21: SSR Safety & Hydration

**User Story:** As a developer, I want all animation components to render their initial static state on the server, so that there are no hydration mismatches when React takes over on the client.

#### Acceptance Criteria

1. THE Animation_System SHALL render the `initial` Framer Motion state on the server for all components that use `useScroll`, `useInView`, or mouse-position hooks.
2. THE `MouseTrackerProvider` and all Three.js canvas components SHALL only mount their event listeners and animation loops after hydration on the client, not during SSR.
3. WHEN React hydrates the page on the client, THE Application SHALL produce no hydration mismatch errors related to animation state or mouse position values.

---

### Requirement 22: Bundle Analysis Tooling

**User Story:** As a developer, I want a bundle analysis tool available in the project, so that I can inspect chunk sizes and verify that the bundle splitting strategy is working correctly.

#### Acceptance Criteria

1. THE project SHALL include `@next/bundle-analyzer` as a dev dependency.
2. WHEN the environment variable `ANALYZE=true` is set, THE `next build` command SHALL open an interactive bundle visualization showing all chunk sizes and their contents.
