Project Overview
FEframework is an enterprise multi-brand, multi-project frontend system with phased rollout:

Phase 1: Core foundation + Kentico MVC export
Phase 2: WordPress export support
Phase 3: React/Next.js headless support
Phase 4: Strapi CMS adapter
Phase 5: Full API integration in components


Project Decisions (Confirmed)

Primary Framework: Bootstrap 5.3.2
MVP Brands: Energia, PowerNI
Component Count: 10-15 components
Documentation: Internal
Distribution: Published to npm
Kentico Output: ../Web/wwwroot/dist


PHASE 1: Foundation + Kentico MVC Export
Goal: Create core component library with Kentico MVC export capability
Duration: 4-6 weeks
Deliverables:

Monorepo with TypeScript, testing, build tools
10 core components with full tests
Kentico export system outputting to ../Web/wwwroot/dist
2 brand themes (Energia, PowerNI)
Storybook documentation
Internal docs site


Phase 1 - Step 1: Project Foundation
1.1: Initialize Monorepo
Tasks:

 Create feframework/ directory
 Run pnpm init
 Create .gitignore:

node_modules/, dist/, coverage/, .env, .env.local, .turbo, .cache, storybook-static/, *.log, .DS_Store


 Create pnpm-workspace.yaml:

 packages:
    - 'packages/*'
    - 'apps/*'
    - 'tools/*'
```

- [ ] Create root `package.json`:
  - Name: "feframework"
  - Private: true
  - Engines: node >=18, pnpm >=8
  - Scripts: dev, build, test, test:coverage, lint, format
  - Scripts: build:ui, build:kentico, build:kentico:energia, build:kentico:powerni
  - Scripts: storybook, storybook:build, docs, docs:build
  - DevDependencies: 
    - typescript ^5.5.0
    - @typescript-eslint/eslint-plugin ^6.0.0
    - @typescript-eslint/parser ^6.0.0
    - eslint ^8.50.0
    - eslint-config-prettier ^9.0.0
    - eslint-plugin-jsx-a11y ^6.9.0
    - eslint-plugin-react ^7.33.0
    - eslint-plugin-react-hooks ^4.6.0
    - prettier ^3.0.0
    - husky ^8.0.3
    - lint-staged ^14.0.0
    - turbo ^1.10.0
    - tsx ^4.0.0

- [ ] Create `turbo.json`:
  - Configure pipeline: build, test, lint, dev, storybook
  - Set dependencies and outputs
  - Configure cache behavior

- [ ] Create root `tsconfig.json`:
  - Target: ES2020
  - Module: ESNext
  - Lib: ES2020, DOM, DOM.Iterable
  - JSX: react-jsx
  - Strict: true
  - Module resolution: bundler

- [ ] Create `.eslintrc.js`:
  - Parser: @typescript-eslint/parser
  - Plugins: @typescript-eslint, react, react-hooks, jsx-a11y
  - Extends: recommended configs + prettier
  - Rules: react/react-in-jsx-scope off

- [ ] Create `.prettierrc`:
  - semi: true, singleQuote: true, tabWidth: 2, trailingComma: es5, printWidth: 100

- [ ] Run `pnpm install`

**Validation:**
- [ ] `pnpm` commands work
- [ ] TypeScript compiles
- [ ] ESLint runs without errors

---

### 1.2: Framework Configuration

**Tasks:**
- [ ] Create `feframework.config.ts`:
  - Interface `FEFrameworkConfig` with:
    - cssFramework: 'bootstrap'
    - version: { bootstrap: string }
    - brand: string
    - purgecss: { enabled: boolean, safelist: string[] }
    - a11y: { enforceStandards: 'WCAG2.1-AA' | 'WCAG2.1-AAA', autoFocusManagement: boolean }
  
  - Export `energiaConfig`:
    - cssFramework: 'bootstrap'
    - version: { bootstrap: '5.3.2' }
    - brand: 'energia'
    - purgecss enabled
    - a11y: WCAG2.1-AA

  - Export `powerniConfig`:
    - cssFramework: 'bootstrap'
    - version: { bootstrap: '5.3.2' }
    - brand: 'powerni'
    - purgecss enabled
    - a11y: WCAG2.1-AA

  - Function `validateConfig(config)`: validate configuration

**Validation:**
- [ ] Import configs successfully
- [ ] TypeScript types work correctly

---

### 1.3: Create Package Structure

**Tasks:**
- [ ] Create directories:
```
  packages/ui/
  packages/themes/
  apps/storybook/
  apps/docs/
  tools/exporters/
  tools/build/
  tests/
```

---

## Phase 1 - Step 2: Core UI Package

### 2.1: Initialize UI Package

**Tasks:**
- [ ] Navigate to `packages/ui/`
- [ ] Create `package.json`:
  - Name: "@feframework/ui"
  - Version: "1.0.0"
  - Type: "module"
  - Main/module/types exports
  - Dependencies:
    - react ^18.3.1
    - react-dom ^18.3.1
    - swiper ^11.1.0
    - bootstrap ^5.3.2
  - DevDependencies:
    - vite ^7.0.0
    - @vitejs/plugin-react ^4.3.0
    - typescript ^5.5.0
    - sass ^1.77.0
    - vitest ^2.0.0
    - @testing-library/react ^16.0.0
    - @testing-library/user-event ^14.5.0
    - @testing-library/jest-dom ^6.1.0
    - jest-axe ^9.0.0
    - axe-core ^4.9.0
    - jsdom ^24.0.0
    - @vitest/ui ^2.0.0
    - purgecss ^6.0.0
  - Scripts: dev, build, build:kentico, test, test:ui, test:coverage, lint
  - Files: ["dist"]

- [ ] Create `tsconfig.json` extending root
- [ ] Create directories:
```
  src/components/
  src/styles/bootstrap/
  src/styles/shared/
  src/assets/fonts/
  src/assets/images/
  src/assets/icons/
  src/utils/
  src/a11y/
```
- [ ] Run `pnpm install`

**Validation:**
- [ ] Package installs successfully
- [ ] No peer dependency warnings

---

### 2.2: Configure Build Tools

**Tasks:**
- [ ] Create `vite.config.ts`:
  - React plugin
  - Library mode with entry: src/index.ts
  - External: react, react-dom, swiper, bootstrap
  - Output: ES module format
  - SCSS preprocessing with Bootstrap
  - Path aliases: @, @components, @utils, @a11y
  - Sourcemaps enabled
  - Terser minification

- [ ] Create `vite.kentico.config.ts`:
  - Read BRAND environment variable
  - Read KENTICO_OUTPUT_PATH from .env (default: dist/kentico)
  - Auto-discover components from src/components/
  - Multi-entry build:
    - css/main from styles/bootstrap/main.scss
    - js/main from kentico-main.ts
    - components/[name]/[name] from each component
  - Output format: IIFE
  - Asset handling: fonts to assets/fonts/, images to assets/images/
  - CSS code splitting enabled
  - Terser minification

- [ ] Create `vitest.config.ts`:
  - Environment: jsdom
  - Coverage provider: v8, thresholds: 80%
  - Setup file: ../../tests/setup.ts
  - Include: **/*.{test,spec}.{ts,tsx}
  - Path aliases matching Vite

- [ ] Create `purgecss.config.js`:
  - Content: src/**/*.{tsx,jsx,ts,js}
  - CSS: dist/**/*.css
  - Safelist: /^swiper/, sr-only, visually-hidden, focus-visible, skip-link, active, show, fade, disabled, /^aria-/, /^data-/
  - Bootstrap safelist: /^btn/, /^form/, /^nav/, /^alert/, /^card/, /^modal/, /^dropdown/
  - Custom extractor for React className

**Validation:**
- [ ] `pnpm build` works (even with empty src)
- [ ] Vitest runs (even with no tests)

---

### 2.3: Create Base Styles

**Tasks:**
- [ ] Create `src/styles/bootstrap/main.scss`:
  - Import Bootstrap from node_modules
  - Import _variables.scss
  - Import _swiper-override.scss
  - NO component styles

- [ ] Create `src/styles/bootstrap/_variables.scss`:
  - Bootstrap variable overrides (to be customized by themes)
  - Typography settings
  - Spacing adjustments

- [ ] Create `src/styles/bootstrap/_swiper-override.scss`:
  - Swiper navigation button styling
  - Swiper pagination styling
  - Bootstrap color integration

- [ ] Create `src/styles/shared/tokens.scss`:
  - Base color palette
  - Spacing scale (4px to 96px)
  - Typography scale
  - Border radius, shadows, transitions

- [ ] Create `src/styles/shared/_a11y-utilities.scss`:
  - .sr-only, .visually-hidden
  - .skip-link
  - .focus-visible
  - @media (prefers-contrast: high)
  - @media (prefers-reduced-motion: reduce)

- [ ] Create `src/styles/shared/swiper-base.scss`:
  - Framework-agnostic Swiper base

**Validation:**
- [ ] SCSS compiles without errors
- [ ] Bootstrap imports successfully

---

### 2.4: Create A11y Utilities

**Tasks:**
- [ ] Create `src/a11y/focus-trap.ts`:
  - Function to trap focus in modals
  - Handle Tab/Shift+Tab
  - TypeScript types + JSDoc

- [ ] Create `src/a11y/aria-helpers.ts`:
  - Generate ARIA attributes
  - Helper functions
  - TypeScript types + JSDoc

- [ ] Create `src/a11y/keyboard-navigation.ts`:
  - Handle keyboard patterns
  - TypeScript types + JSDoc

- [ ] Create `src/a11y/screen-reader.ts`:
  - Live region announcements
  - TypeScript types + JSDoc

- [ ] Create `src/a11y/color-contrast.ts`:
  - Calculate contrast ratios
  - WCAG AA/AAA verification
  - TypeScript types + JSDoc

**Validation:**
- [ ] All files compile
- [ ] TypeScript has no errors

---

### 2.5: Create Test Infrastructure

**Tasks:**
- [ ] Create `tests/setup.ts` at root:
  - Import @testing-library/jest-dom
  - Extend expect with toHaveNoViolations
  - Cleanup after each test
  - Mock window.matchMedia
  - Mock IntersectionObserver
  - Mock ResizeObserver

- [ ] Create `tests/test-utils.tsx`:
  - Custom render with providers
  - Brand context support
  - Export Testing Library utilities

- [ ] Create `tests/a11y-utils.ts`:
  - Helper for axe tests
  - Helpers for keyboard nav
  - Helpers for focus management
  - Helpers for ARIA verification

- [ ] Create `tests/mock-data.ts`:
  - Mock component props
  - Mock fixtures

**Validation:**
- [ ] Test files compile
- [ ] Can import test utilities

---

### 2.6: Create Kentico Entry Point

**Tasks:**
- [ ] Create `.env` at root:
  - KENTICO_OUTPUT_PATH=../Web/wwwroot/dist

- [ ] Create `src/kentico-main.ts`:
  - Import React, ReactDOM
  - Expose as window.React, window.ReactDOM
  - Initialize window.FEFramework namespace
  - Create component registry object
  - Auto-mount system:
    - Scan for [data-component] on DOMContentLoaded
    - Parse data-props JSON
    - Mount components
    - Error handling
  - Manual mount API: FEFramework.mount(elementId, componentName, props)
  - Add version property

**Validation:**
- [ ] File compiles
- [ ] Can build kentico bundle (even empty)

---

## Phase 1 - Step 3: Core Components (10 Components)

### 3.1: Button Component

**Tasks:**
- [ ] Create `src/components/Button/` directory

- [ ] Create `Button.tsx`:
  - Props: variant, size, brand, disabled, loading, onClick, children, className, type
  - Bootstrap button classes
  - ARIA: aria-disabled, aria-busy
  - Keyboard handling
  - Loading spinner when loading=true
  - Apply brand class

- [ ] Create `Button.types.ts`:
  - ButtonProps interface
  - Variant type union
  - Size type union

- [ ] Create `Button.bootstrap.scss`:
  - Import Bootstrap buttons
  - Override button variables
  - Brand-specific: .btn.energia-primary, .btn.powerni-primary
  - Ensure 4.5:1 contrast
  - Focus, disabled, loading states

- [ ] Create `Button.test.tsx`:
  - Test all props
  - Test onClick
  - Test keyboard
  - Test disabled (no onClick)
  - Test loading (spinner, no onClick)
  - Test variants, sizes, brands
  - 80%+ coverage

- [ ] Create `Button.a11y.test.tsx`:
  - Axe on all variants
  - Keyboard Tab focus
  - aria-disabled, aria-busy
  - Color contrast
  - Reduced motion

- [ ] Create `Button.stories.tsx`:
  - Default, all variants, all sizes
  - Energia, PowerNI brands
  - Disabled, loading states
  - Interactive controls

- [ ] Create `index.ts`:
  - Import ./Button.bootstrap.scss
  - Export Button, ButtonProps

**Validation:**
- [ ] Component renders in isolation
- [ ] Tests pass
- [ ] Storybook story works
- [ ] A11y tests pass

---

### 3.2: Card Component

**Tasks:**
- [ ] Create `src/components/Card/` directory

- [ ] Create `Card.tsx`:
  - Props: header, body, footer, image, imageAlt, href, brand, className
  - Semantic: <article> or <a>
  - Bootstrap card structure
  - Image with alt text
  - Apply brand class

- [ ] Create `Card.types.ts`:
  - CardProps interface

- [ ] Create `Card.bootstrap.scss`:
  - Bootstrap card styles
  - Brand overrides
  - Hover/focus for clickable
  - Image aspect ratio

- [ ] Create `Card.test.tsx`:
  - Test header/body/footer
  - Test with image
  - Test clickable (href)
  - Test brands
  - 80%+ coverage

- [ ] Create `Card.a11y.test.tsx`:
  - Axe tests
  - Image alt required
  - Focus for clickable
  - Semantic HTML

- [ ] Create `Card.stories.tsx`:
  - Default, with image, clickable
  - Energia, PowerNI brands
  - Controls

- [ ] Create `index.ts`:
  - Import styles, export Card

**Validation:**
- [ ] Component works
- [ ] Tests pass
- [ ] Story works

---

### 3.3: Hero Component

**Tasks:**
- [ ] Create `src/components/Hero/` directory

- [ ] Create `Hero.tsx`:
  - Props: title, subtitle, backgroundImage, overlayOpacity, primaryAction, secondaryAction, brand, className
  - Full-width section
  - Background image with overlay
  - Centered content
  - CTA buttons
  - Brand class

- [ ] Create `Hero.types.ts`:
  - HeroProps interface
  - Action button interface

- [ ] Create `Hero.bootstrap.scss`:
  - Hero section styling
  - Background image
  - Overlay
  - Responsive typography
  - Brand colors
  - Text contrast on overlay

- [ ] Create `Hero.test.tsx`:
  - Test all props
  - Test actions
  - Test background
  - Test brands
  - 80%+ coverage

- [ ] Create `Hero.a11y.test.tsx`:
  - Axe tests
  - Heading hierarchy (h1)
  - Contrast on overlay
  - CTA accessibility

- [ ] Create `Hero.stories.tsx`:
  - Default, with background, with CTAs
  - Energia, PowerNI brands
  - Controls

- [ ] Create `index.ts`:
  - Import styles, export Hero

**Validation:**
- [ ] Component works
- [ ] Tests pass
- [ ] Story works

---

### 3.4: Carousel Component (Swiper)

**Tasks:**
- [ ] Create `src/components/Carousel/` directory

- [ ] Create `Carousel.tsx`:
  - Import from swiper/react
  - Import modules: Navigation, Pagination, Autoplay, A11y
  - Props: slides, autoplay, navigation, pagination, ariaLabel, brand, className
  - Configure Swiper with full a11y
  - ARIA labels on navigation
  - ARIA labels on pagination
  - Keyboard navigation
  - Screen reader announcements
  - Pause/play for autoplay
  - Brand class

- [ ] Create `Carousel.types.ts`:
  - CarouselProps interface
  - SlideData interface

- [ ] Create `Carousel.bootstrap.scss`:
  - Import Swiper CSS modules
  - Bootstrap-themed Swiper
  - Brand navigation/pagination colors
  - Focus indicators

- [ ] Create `Carousel.test.tsx`:
  - Mock Swiper components
  - Test slide rendering
  - Test navigation/pagination props
  - Test autoplay
  - Test brands
  - 80%+ coverage

- [ ] Create `Carousel.a11y.test.tsx`:
  - Axe tests
  - ARIA labels
  - Keyboard navigation
  - Focus management
  - role="region", aria-label
  - Pause/play controls

- [ ] Create `Carousel.stories.tsx`:
  - Default with 3 slides
  - With navigation, pagination
  - Autoplay
  - Energia, PowerNI brands
  - Controls

- [ ] Create `index.ts`:
  - Import Swiper CSS, component styles
  - Export Carousel

**Validation:**
- [ ] Swiper works
- [ ] Tests pass
- [ ] Story works

---

### 3.5: Remaining 6 Core Components

**Create following components with same structure:**
1. **FormInput** - Text input with label, error, validation
2. **FormSelect** - Dropdown select with label, error
3. **Modal** - Dialog with focus trap, backdrop
4. **Navbar** - Header navigation with mobile toggle
5. **Footer** - Footer with links, copyright
6. **Alert** - Notification with variants

**For each component:**
- [ ] Directory structure
- [ ] .tsx component file
- [ ] .types.ts file
- [ ] .bootstrap.scss file
- [ ] .test.tsx file (80%+ coverage)
- [ ] .a11y.test.tsx file
- [ ] .stories.tsx file
- [ ] index.ts export

**Validation per component:**
- [ ] Renders correctly
- [ ] Tests pass
- [ ] A11y tests pass
- [ ] Story works

---

### 3.6: Component Index & Entry Point

**Tasks:**
- [ ] Create `src/components/index.ts`:
  - Export all 10 components
  - Export all types

- [ ] Create `src/index.ts`:
  - Import 'bootstrap/dist/css/bootstrap.min.css'
  - Import './styles/bootstrap/main.scss'
  - Export all from './components'
  - Export all from './utils'
  - Export all from './a11y'

**Validation:**
- [ ] Can import from @feframework/ui
- [ ] TypeScript types work

---

## Phase 1 - Step 4: Kentico Export System

### 4.1: Configure Output Path

**Tasks:**
- [ ] Update `vite.kentico.config.ts`:
  - Read KENTICO_OUTPUT_PATH from .env
  - Default to dist/kentico
  - Set as outDir

**Validation:**
- [ ] Environment variable works
- [ ] Can change output path

---

### 4.2: Create Build Script

**Tasks:**
- [ ] Create `tools/build-kentico.ts`:
  - Import fs, path, vite
  - Read --brand argument (energia or powerni)
  - Validate brand
  - Set BRAND environment variable
  - Read KENTICO_OUTPUT_PATH
  - Auto-discover components from packages/ui/src/components/
  - Run vite build with vite.kentico.config.ts
  - After build, call PurgeCSS
  - Generate manifest.json:
    - version, cssFramework, brand, buildDate
    - components array with name, files, dependencies, size
    - main object with js/css paths and sizes
  - Generate size report (before/after PurgeCSS)
  - Verify a11y classes preserved
  - Log summary

**Validation:**
- [ ] Script runs
- [ ] Creates output directory

---

### 4.3: Create PurgeCSS Plugin

**Tasks:**
- [ ] Create `tools/vite-plugin-purgecss.ts`:
  - Vite plugin with writeBundle hook
  - Load purgecss.config.js
  - Add Bootstrap safelist
  - Add brand safelist
  - Run PurgeCSS on output CSS
  - Calculate savings
  - Verify critical classes remain
  - Write optimized CSS
  - Log report

**Validation:**
- [ ] Plugin runs
- [ ] CSS is optimized
- [ ] Critical classes preserved

---

### 4.4: Add Build Scripts

**Tasks:**
- [ ] Update root `package.json`:
  - "build:kentico": "tsx tools/build-kentico.ts"
  - "build:kentico:energia": "pnpm build:kentico --brand=energia"
  - "build:kentico:powerni": "pnpm build:kentico --brand=powerni"

**Validation:**
- [ ] Commands run
- [ ] No errors

---

### 4.5: Test Kentico Build

**Tasks:**
- [ ] Run `pnpm build:kentico:energia`
- [ ] Verify output in `../Web/wwwroot/dist/`:
  - css/main.min.css exists
  - js/main.min.js exists
  - components/button/button.min.{css,js} exist
  - All 10 component bundles exist
  - manifest.json exists and valid
  - assets/fonts/ has fonts
  - assets/images/ has images

- [ ] Run `pnpm build:kentico:powerni`
- [ ] Verify same structure with powerni branding

- [ ] Check file sizes <50KB per component
- [ ] Verify Swiper and a11y classes in CSS

**Validation:**
- [ ] All files generated correctly
- [ ] Manifest is accurate
- [ ] Sizes are reasonable

---

## Phase 1 - Step 5: Theme System

### 5.1: Create Theme Package Structure

**Tasks:**
- [ ] Create directories:
```
  packages/themes/_base/
  packages/themes/energia/
  packages/themes/powerni/


Create packages/themes/package.json:

Name: "@feframework/themes"
Version: "1.0.0"
Type: "module"
Files: ["dist", "**/*.scss"]



Validation:

 Package structure exists


5.2: Create Base Tokens
Tasks:

 Create packages/themes/_base/tokens.scss:

Color palette (primary, secondary, success, danger, etc.)
Spacing scale ($spacer-1 to $spacer-12)
Typography scale (sizes, weights, line heights)
Border radius (sm, md, lg)
Shadows (sm, md, lg)
Transitions (fast, normal, slow)


 Create packages/themes/_base/variables.scss:

Convert tokens to CSS custom properties


 Create packages/themes/_base/swiper-base.scss:

Base Swiper theme using tokens



Validation:

 SCSS compiles
 Tokens accessible


5.3: Create Energia Theme
Tasks:

 Create packages/themes/energia/tokens.scss:

Import base: @use '../_base/tokens' as base
Override $primary: #00a651 (Energia green)
Override $secondary: #005826
Override $accent: #ffd100
Additional overrides


 Create packages/themes/energia/bootstrap.scss:

Import energia tokens
Override Bootstrap variables with energia colors
Import Bootstrap: @import 'bootstrap/scss/bootstrap'


 Create packages/themes/energia/swiper-energia.scss:

Import swiper base
Apply Energia colors to navigation/pagination



Validation:

 Theme compiles
 Colors applied correctly


5.4: Create PowerNI Theme
Tasks:

 Create packages/themes/powerni/tokens.scss:

Import base tokens
Override $primary: #0066b3 (PowerNI blue)
Override $secondary: #004080
Additional overrides


 Create packages/themes/powerni/bootstrap.scss:

Import powerni tokens
Override Bootstrap variables
Import Bootstrap


 Create packages/themes/powerni/swiper-powerni.scss:

Import swiper base
Apply PowerNI colors



Validation:

 Theme compiles
 Colors applied correctly


5.5: Integrate Themes with Build
Tasks:

 Update tools/build-kentico.ts:

Pass brand to Vite via environment
Set theme path based on brand


 Update vite.kentico.config.ts:

Read brand from env
Configure SCSS additionalData to import brand theme:

@import "@feframework/themes/${brand}/bootstrap.scss"





Validation:

 Build with energia uses energia theme
 Build with powerni uses powerni theme
 Colors appear correctly in output


Phase 1 - Step 6: Storybook
6.1: Initialize Storybook
Tasks:

 Navigate to apps/
 Run pnpm dlx storybook@latest init --type react --builder vite
 Choose apps/storybook directory
 Install addons:

pnpm add -D @storybook/addon-a11y @storybook/addon-interactions



Validation:

 Storybook installs
 Can start with pnpm storybook


6.2: Configure Storybook
Tasks:

 Update .storybook/main.ts:

Framework: @storybook/react-vite
Stories: '../../packages/ui/src/**/*.stories.tsx'
Addons: essentials, a11y, interactions
Vite config: add SCSS support


 Create .storybook/preview.ts:

Import bootstrap/dist/css/bootstrap.min.css
Import @feframework/themes/energia/bootstrap.scss (default)
Configure viewports
Configure a11y: WCAG 2.1 AA
Set default parameters


 Create .storybook/manager.ts:

Custom theme with Energia colors



Validation:

 Storybook starts
 Shows all component stories


6.3: Create Brand Switcher
Tasks:

 Create .storybook/decorators/BrandDecorator.tsx:

React decorator component
Toolbar dropdown: Energia, PowerNI
useEffect to swap CSS:

Remove existing brand link
Create new link with brand CSS
Append to head


Persist in localStorage
Apply brand class to wrapper
Re-render on change


 Update .storybook/preview.ts:

Import BrandDecorator
Add to decorators
Configure toolbar item



Validation:

 Brand switcher appears
 Switching changes theme
 All components update


6.4: Test Storybook
Tasks:

 Run pnpm storybook
 Verify all 10 component stories load
 Test brand switcher with each component
 Check a11y addon shows no violations
 Test interactive controls
 Build: pnpm build-storybook
 Verify static build works

Validation:

 All stories work
 Brand switching works
 No a11y violations
 Build succeeds


Phase 1 - Step 7: Documentation Site
7.1: Initialize Docusaurus
Tasks:

 Navigate to apps/
 Run pnpm create docusaurus@latest docs classic --typescript

Validation:

 Docusaurus installs


7.2: Configure Docusaurus
Tasks:

 Update docusaurus.config.ts:

Title: "FEFramework Documentation"
Tagline
Theme: Energia green primary
Navbar: Docs, Components, Storybook link
Footer: company info
Disable Algolia


 Update sidebars.ts:

Getting Started section
Components section
Theming section
Kentico Integration section
Accessibility section



Validation:

 Config valid
 Site structure correct


7.3: Create Documentation
Tasks:

 Create docs/getting-started/installation.md:

Prerequisites
Installation: pnpm add @feframework/ui bootstrap
Import CSS and components
Environment setup


 Create docs/getting-started/quick-start.md:

Simple Button example
Import statement
Basic usage
Next steps


 Create docs/components/overview.md:

List all 10 components
Brief descriptions
Links to individual pages
Link to Storybook


 For each component, create docs/components/[component].md:

Description
Props API table
Usage example with code
Accessibility features
Storybook iframe embed
Bootstrap class reference


 Create docs/theming/overview.md:

Theme system explanation
Energia and PowerNI themes
Design tokens


 Create docs/theming/creating-themes.md:

Step-by-step new brand guide
Token structure
SCSS overrides
Build integration


 Create docs/theming/tokens.md:

Document all tokens
Color swatches
Spacing scale
Typography scale


 Create docs/kentico-integration/overview.md:

Kentico export system explanation
Output structure
File organization


 Create docs/kentico-integration/usage.md:

How to use exported files in Kentico
Loading CSS/JS in views
Component mounting (auto and manual)
Example .cshtml code


 Create docs/kentico-integration/manifest.md:

Manifest.json structure
Component registry
Dependencies


 Create docs/accessibility/overview.md:

WCAG 2.1 AA compliance
Framework a11y features
Testing approach


 Create docs/accessibility/testing.md:

Running a11y tests
Using jest-axe
Manual testing checklist



Validation:

 All pages exist
 Links work
 Code examples are correct


7.4: Build and Test Docs
Tasks:

 Run pnpm docs to start dev server
 Verify all pages load
 Test navigation
 Check code snippets
 Build: pnpm docs:build
 Test production build

Validation:

 Docs site works
 All content accessible
 Build succeeds


Phase 1 - Step 8: CI/CD Pipeline
8.1: GitHub Actions Workflow
Tasks:

 Create .github/workflows/ci.yml:
Lint Job:

Checkout code
Setup Node and pnpm
Install dependencies
Run ESLint
Run Prettier check
Run TypeScript check

Test Job:

Checkout, setup, install
Run vitest
Generate coverage
Upload to Codecov
Fail if <80%

A11y Job:

Checkout, setup, install
Run a11y tests
Generate report
Upload artifact
Fail on violations

Build Job:

Checkout, setup, install
Build UI library
Build Kentico Energia
Build Kentico PowerNI
Build Storybook
Build Docs
Verify all succeed

Deploy Job (main branch only):

Deploy Storybook to Netlify/Vercel
Deploy Docs to Netlify/Vercel



Validation:

 Workflow file valid
 Can be triggered


8.2: Pre-commit Hooks
Tasks:

 Install Husky: pnpm add -D husky
 Init: pnpm exec husky init
 Create .husky/pre-commit:

Run lint-staged


 Install: pnpm add -D lint-staged
 Create lint-staged.config.js:

'*.{ts,tsx}': eslint
'*.{ts,tsx,js,jsx,json,md}': prettier --write
Run tests on changed files (optional)



Validation:

 Pre-commit hook works
 Blocks bad commits


8.3: Test CI
Tasks:

 Create test branch
 Make small change
 Push to GitHub
 Verify all jobs run
 Fix any failures
 Merge when green

Validation:

 All CI jobs pass
 Deploys work


Phase 1 - Step 9: NPM Publishing
9.1: Prepare for Publishing
Tasks:

 Update packages/ui/package.json:

Set publishConfig: { access: "public" } or "restricted"
Add repository, homepage, bugs fields
Add keywords
Add author, license


 Update packages/themes/package.json:

Same publish config and metadata


 Create .npmignore in each package:

Exclude tests, stories, source maps (optional)


 Create README.md in each package:

Installation instructions
Basic usage
Link to documentation



Validation:

 Package.json valid
 README clear


9.2: Version Management
Tasks:

 Install Changesets: pnpm add -D @changesets/cli
 Init: pnpm exec changeset init
 Create CHANGELOG.md in root
 Document versioning strategy (semver)

Validation:

 Changesets configured


9.3: First Release
Tasks:

 Create changeset: pnpm exec changeset

Select packages to version
Choose version bump (major/minor/patch)
Write summary


 Version packages: pnpm exec changeset version

Updates package.json versions
Updates CHANGELOG.md


 Commit version changes
 Create Git tag: v1.0.0
 Push tag
 Publish to npm: pnpm exec changeset publish

Login if needed: npm login
Publishes @feframework/ui and @feframework/themes



Validation:

 Packages published
 Can install from npm
 Versions correct


Phase 1 - Milestone Checklist
Deliverables:

 Monorepo fully configured (pnpm, Turbo, TypeScript, ESLint)
 10 core components built and tested (80%+ coverage each)
 All components have passing a11y tests (no violations)
 2 brand themes working (Energia, PowerNI)
 Kentico export system exporting to ../Web/wwwroot/dist
 PurgeCSS optimizing CSS (<50KB per component)
 Storybook deployed with brand switcher
 Internal docs site deployed
 CI/CD pipeline operational (lint, test, build, deploy)
 Packages published to npm (@feframework/ui, @feframework/themes)
 Pre-commit hooks enforcing quality

Validation:

 Can install from npm: pnpm add @feframework/ui bootstrap
 Can import components: import { Button } from '@feframework/ui'
 Kentico build outputs all files correctly
 Storybook accessible at URL
 Docs accessible at URL
 All tests passing
 No a11y violations
 CI green on main branch