# AGENTS.md - MC_sGen Project Rules & Design Guidelines

This file defines project context, architectural guidelines, and design workflows for AI coding assistants working on **MC_sGen**.

---

## 1. Project Context & Design Context

### Users
Minecraft players, creators, streamers, and enthusiasts looking to convert real-life portraits, selfies, or custom avatars into authentic, game-ready 64×64 px Minecraft skins (Java & Bedrock RGBA formats) in seconds directly in the browser.

### Brand Personality
- **Tech-forward & Playful**: WebGPU-accelerated and voxel-inspired without feeling cartoonish or cheap.
- **Precision & Authenticity**: True 64×64 pixelation, proper RGBA alpha preservation, authentic Steve (4px) & Alex (3px) proportions, Minecraft UI references.
- **Dark Luxury Voxel Aesthetic**: Dark obsidian/slate slate theme with refined emerald green (`#10b981`), diamond cyan (`#06b6d4`), and crisp micro-interactions.

### Aesthetic Direction
- **Primary Style**: Dark Mode (OLED / Deep Slate `#090a0f`) combined with Chiseled Minecraft Voxel accents.
- **Tone**: Professional web tool with playful gaming depth. Avoid generic purple-pink AI gradients, gratuitous glowing cards, or unreadable low-contrast text.
- **Anti-references**: Cluttered Excel-like data dumps, flat generic bootstrap, washed-out generic dark themes.

### Implementation Defaults
- **Stack**: React 18 + Vite + Tailwind CSS + Framer Motion.
- **3D & Rendering**: `skinview3d` (Three.js WebGL canvas), `vgpu` (WebGPU background shader with CSS fallback), HTML5 Canvas 2D for pixel manipulation.
- **Icons**: Lucide React.
- **Design Tokens**: Defined in `tailwind.config.js` and `src/styles/index.css`.

### Core Design Principles
1. **Clear Information Hierarchy**: The primary workflow (Upload -> Customize -> Preview 3D -> Download) must guide the eye naturally.
2. **Instant Visual Feedback**: Any change in sliders or photo input must immediately reflect on the 3D model and 2D UV canvas without layout shift.
3. **Semantic Colors & Tactile Depth**: Use emerald for primary actions/confirmations, cyan for technical/AI indicators, amber for warnings, and stone for secondary controls. Maintain tactile 3D beveled button physics.
4. **Resilient Responsiveness & Accessibility**: Support screen widths from 375px to 1440px+ with accessible keyboard navigation, clear focus outlines, and full screen contrast ratios >= 4.5:1.

---

## 2. UI/UX DESIGN WORKFLOW

For every significant UI task, use the installed design skills before implementation.

### General UI:
1. `ui-ux-pro-max` (design intelligence, style rules, palette validation)
2. Relevant `better-web-ui` skills (`hierarchy`, `arrange`, `colorize`, `typography`)
3. Implementation (focused, high-fidelity components)
4. `critique` (senior review pass)
5. `audit` (accessibility, contrast, touch targets, edge cases)
6. `polish` (micro-interactions, states, animations)

### Tool / Generator / Dashboard UI:
1. `ui-ux-pro-max`
2. `yafa-ui-dashboard` (density, KPI cards, control organization)
3. `arrange` / `hierarchy` / `colorize` / `data-viz` as appropriate
4. Implementation
5. `critique`
6. `audit`
7. `polish`

### Review Criteria:
Do not treat generated UI as finished after the first implementation. Always evaluate:
- **Information hierarchy**: What does the user see in the first 3 seconds?
- **Visual hierarchy**: Font sizes, weights, contrast levels.
- **Spacing & Alignment**: Consistent 4px/8px grid scale.
- **Typography**: Clean sans-serif headings and legible monospace data chips.
- **Semantic colors**: Never use color as the sole indicator of status.
- **Accessibility**: WCAG AA contrast (4.5:1), keyboard focus, aria labels.
- **Responsive behavior**: Usable on 375px, 768px, 1024px, 1440px.
- **Information density**: High utility ratio with minimal decorative clutter.
- **States**: Loading, empty, active, disabled, error states.
- **Consistency with existing product**: Preserve 3D voxel button aesthetic and dark luxury palette.
