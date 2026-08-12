GrowthTimeline component - Setup & Preview

This project includes a self-contained React component at:
  src/components/GrowthTimeline.tsx

A demo wrapper is provided at:
  src/components/GrowthTimelineDemo.tsx

Install Recharts
----------------
Recharts is required to render the chart. From your project root run one of the following:

# Using npm
npm install recharts

# Using yarn
yarn add recharts

Note: If your project currently lacks package.json (e.g. a plain static site), add one using `npm init` or integrate this component into an existing React app (CRA/Vite/Next/etc.).

Preview the demo
----------------
1. Ensure the project is a React app (Create React App / Vite / Next).
2. Import and render the demo component in your app's entry point or route. Example (App.tsx):

import React from 'react';
import GrowthTimelineDemo from './components/GrowthTimelineDemo';

export default function App() {
  return <GrowthTimelineDemo />;
}

3. Start your dev server (npm run dev or npm start depending on your setup).

Options performed (automated)
-----------------------
- Storybook story added: src/components/GrowthTimeline.stories.tsx
- Inline component styles extracted to src/components/GrowthTimeline.css and imported from the component
- Demo integrated into the app at the Scale & Growth section (App.tsx now renders src/components/GrowthTimelineDemo)
- Storybook config added: .storybook/main.js and .storybook/preview.js
- package.json scripts updated to include "storybook" and "dev" commands

Next steps to preview locally
---------------------------
1. Install dependencies:

   npm install

   (This will install react, react-dom, recharts, vite, storybook packages, and TypeScript.)

2. Run Storybook (isolated component preview):

   npm run storybook

   Opens on http://localhost:6006 by default.

3. Run the app (Vite dev server):

   npm run dev

Notes
-----
- If your project uses a different package manager or toolchain, adapt the commands accordingly.
- Storybook and Vite may require additional configuration depending on your environment; the files added here provide a minimal setup.
