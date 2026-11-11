# POPRIO — Gourmet Popcorn & WordPress Visual Editor Suite

The official interactive website and WordPress system for **POPRIO** (`eatpoprio.com`), Bangladesh's premium gourmet popcorn brand.

Built with a bold, neo-brutalist comic-book design, powered by **React 19**, **TypeScript**, **Tailwind CSS v4**, and **GSAP ScrollTrigger**, delivered as a **production-ready traditional WordPress theme** with a **companion click-to-edit Visual Editor plugin**.

---

## Architecture Overview

```
                                      ┌─────────────────────────────────────────────────────────┐
                                      │                      WordPress                          │
                                      │  (Serves PHP templates directly — No Node server needed)│
                                      └────────────────────────────┬────────────────────────────┘
                                                                   │
                                    ┌──────────────────────────────┴──────────────────────────────┐
                                    ▼                                                             ▼
┌─────────────────────────────────────────────────────────────┐ ┌─────────────────────────────────────────────────────────┐
│              Package A: POPRIO Theme                        │ │        Package B: POPRIO Visual Editor Plugin           │
│           (wp-content/themes/poprio-theme)                  │ │     (wp-content/plugins/poprio-visual-editor)           │
├─────────────────────────────────────────────────────────────┤ ├─────────────────────────────────────────────────────────┤
│ • Traditional PHP theme templates (header, footer, front)   │ │ • Administrator click-to-edit interface                 │
│ • Compiled React 19 + GSAP + Tailwind CSS v4 frontend       │ │ • Live two-way inspector panels & section editing       │
│ • Vite asset manifest integration                           │ │ • REST API (/wp-json/poprio/v1/content)                │
│ • 100% authentic brand assets, videos & 5-package fan       │ │ • Draft saving, live publishing & validation            │
│ • Public visitor view with zero editor overhead             │ │ • 10-snapshot rolling revision history with rollback    │
└─────────────────────────────────────────────────────────────┘ └─────────────────────────────────────────────────────────┘
```

---

## Brand Guidelines & Identity

- **Butter Yellow:** `#FFC72C`
- **Cocoa Brown:** `#4B1F0F`
- **Red Orange:** `#E0351B`
- **Warm Cream:** `#FFF3E0`
- **Accent Pink:** `#F5A7BE`
- **Caramel:** `#D78A24`
- **Typography:**
  - Headings: `Archivo Black`
  - Body Text: `Plus Jakarta Sans`
  - Decorative Comic Lettering: `Bangers`
- **5 Signature Flavours:**
  1. Caramel (`#01`)
  2. Cookies & Cream (`#02`)
  3. Strawberry (`#03`)
  4. Nutella Choco Hazelnut (`#04`)
  5. Snickers Inspired (`#05`)

---

## Installation & Deployment

### Method 1: Direct Folder Copy (Recommended for LocalWP, XAMPP, cPanel, or FTP)
1. Copy [`wp-content/themes/poprio-theme`](wp-content/themes/poprio-theme) into your WordPress site's `wp-content/themes/` folder.
2. Copy [`wp-content/plugins/poprio-visual-editor`](wp-content/plugins/poprio-visual-editor) into your WordPress site's `wp-content/plugins/` folder.
3. In WordPress Admin:
   - Go to **Appearance > Themes** and activate **POPRIO Theme**.
   - Go to **Plugins** and activate **POPRIO Visual Editor**.

### Method 2: Upload via WordPress Admin Dashboard
1. Go to **Appearance > Themes > Add New > Upload Theme**:
   - Choose `poprio-theme.zip` (59.5 MB standalone theme with all media bundled inside).
   - *Note: If your host has a strict 2MB–8MB PHP upload limit, upload `poprio-theme-lite.zip` (881 KB) instead, and copy the `assets/` folder to the theme directory or media library.*
2. Go to **Plugins > Add New > Upload Plugin**:
   - Choose `poprio-visual-editor.zip` (15 KB) and click **Activate**.

---

## Using the POPRIO Visual Editor

1. Log in to your WordPress Admin dashboard.
2. Visit the frontend of your website.
3. Click the floating **Edit Page** button in the bottom-left corner (or append `?poprio_edit=1` to any page URL).
4. The Visual Editor toolbar will appear at the top of the viewport:
   - **Device Preview Switcher:** Seamlessly switch between **Desktop (100%)**, **Tablet (768px frame)**, and **Mobile (390px frame)**.
   - **Edit / Preview Toggle:** Toggle edit boundaries on/off to preview the exact public view.
   - **Granular Click-to-Edit:** Click any individual heading, subtitle, button, bento card, or package pouch directly on the page to open its dedicated Editorial Styling Box.
   - **Editorial Styling Box (3 Contextual Tabs):**
     - **Content & Media:** Edit text copy, replace image pouches, or swap promotional videos using the 1-click **WordPress Media Library (`wp.media`)** modal or direct URL input.
     - **Typography:** Custom font family picker (`Archivo Black`, `Plus Jakarta Sans`, `Bangers`, `Space Grotesk`, `Nunito Sans`, `Titan One`), font size slider & input (`12px` to `96px`), font weight buttons (`400` to `900`), text alignment (`left`, `center`, `right`, `justify`), text transform, line-height, letter-spacing, and brand color palette presets with custom hex color picker.
     - **CSS Styles & Box Model:** Inside padding and outside margin inputs, background color, border width (`none`, `2px`, `3px`, `4px comic`, `6px heavy`), border style, corner border-radius slider + pill button, neo-brutalist hard shadow presets, comic tilt rotation slider (`-15°` to `+15°`), and opacity slider.
   - **Live Two-Way Binding:** Instantaneous live preview with zero lag or page reload.
   - **Restore Brand Defaults:** 1-click button to reset custom styles back to factory brand specifications.
   - **Undo / Redo:** Full 25-state history stack (`Ctrl+Z`, `Ctrl+Y`).
   - **Save Draft:** Save your work without publishing it to live visitors.
   - **Publish Live:** Commit your changes to the live website with 1 click.
   - **Revision Rollback:** Access the 10-revision history drawer to restore any prior snapshot.

*For regular, non-logged-in visitors, the visual editor code remains completely inert and invisible.*

---

## Developer Workflow

### Prerequisites
- Node.js (version 18 or newer)
- PHP (version 8.0 or newer)
- WordPress (version 6.2 or newer)

### Local React Development
```bash
npm install
npm run dev
```
Starts the local Vite dev server at [http://localhost:3000](http://localhost:3000).

### Compiling Production Assets
```bash
npm run build
```
Compiles React 19, TypeScript, and Tailwind CSS v4 with hashed production bundles and synchronizes the code to `wp-content/themes/poprio-theme/dist/`.

### Automated Testing
Run the complete automated verification test suite:
```bash
npm test
```
Executes **69 / 69 passing assertions**:
1. `npm run typecheck` — TypeScript compilation & static typing (0 errors).
2. `php scripts/verify-render.php` — Route rendering tests (`/`, `/about`, `/contact`).
3. `php scripts/test-phase-3.php` — 30 canonical schema, sanitization, revision, and REST API tests.
4. `php scripts/test-phase-5.php` — 36 theme structure, Vite manifest, asset completeness, and packaging tests.

### Packaging Installable Archives
Generate fresh production ZIP packages:
```bash
npm run package:all
```
Outputs:
- `poprio-theme.zip` (59.5 MB standalone theme with all media)
- `poprio-theme-lite.zip` (881 KB ultra-lite theme)
- `poprio-assets.zip` (58.7 MB standalone media archive)
- `poprio-visual-editor.zip` (15 KB companion plugin)

---

## Standalone PHP Theme Preview
To preview how WordPress renders the PHP theme templates without installing WordPress:
```bash
php -S localhost:8088 scripts/preview-wp-theme.php
```
Open [http://localhost:8088](http://localhost:8088) in your browser.

---

## License & Credits

- Official brand assets, packaging illustrations, and video materials © POPRIO. All rights reserved.
- Proprietary theme and companion visual editor developed for POPRIO.
