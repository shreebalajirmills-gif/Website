TrustSection component

Files included:
- TrustSection.tsx — Original CSS-based React component (TrustSection.css)
- TrustSection.css — CSS file with styles, animations, and responsive behavior
- TrustSection.tailwind.tsx — Tailwind-compatible implementation using utility classes (does not install Tailwind)
- TrustSection.demo.tsx — Simple demo wrapper with placeholder assets

How to use the Tailwind version

This repository does not currently include Tailwind. To use the Tailwind component (TrustSection.tailwind.tsx), install and configure Tailwind in your project (example steps for a Create React App / Vite project):

1. Install dependencies:
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p

2. Configure tailwind.config.js content paths to include your src folder, e.g.:
   module.exports = {
     content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
     theme: { extend: {} },
     plugins: [],
   }

3. Add Tailwind directives to your global CSS (e.g., src/index.css):
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

4. Replace imports/use of TrustSection.tsx with TrustSection.tailwind.tsx in your pages/components.

Preview/demo
- A simple demo wrapper exists at src/components/TrustSection.demo.tsx which uses placeholder assets.
- A page component to render the demo is at src/pages/TrustSectionPage.tsx — import this into your router or app entry to preview quickly.

Notes & recommendations
- The Tailwind variant intentionally mirrors layout and animation classes; some animations rely on the `.animate-on-scroll` and `.in-view` classes which are toggled by IntersectionObserver at runtime. Keep that logic if you reuse the Tailwind component.
- If you want me to actually install Tailwind in this repository and wire it up (add package.json scripts, config, and modify global CSS), confirm and I'll proceed.
