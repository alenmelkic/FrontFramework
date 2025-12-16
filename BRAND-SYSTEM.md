# Dynamic Multi-Brand System

## Overview

FEFramework now supports a **dynamic multi-brand architecture** where each brand (Energia, PowerNI, etc.) can have:
- ✅ Independent output paths (separate websites)
- ✅ Brand-specific component sets
- ✅ Exclusive components per brand
- ✅ Shared common components
- ✅ Component exclusions per brand
- ✅ Brand-specific themes and colors

## Architecture

### Brand Configuration (`brands.config.ts`)

All brand settings are centralized in a single configuration file:

```typescript
export interface BrandConfig {
  id: string;                    // Brand identifier
  name: string;                  // Display name
  colors: {
    primary: string;             // Primary brand color
    secondary: string;           // Secondary color
    accent?: string;             // Optional accent color
  };
  outputPath: string;            // Build output directory
  components: {
    common: string[];            // Shared components
    exclusive?: string[];        // Brand-specific components
    exclude?: string[];          // Components to exclude
  };
  theme: {
    path: string;                // SCSS theme file path
  };
}
```

### Current Brands

#### Energia
- **Output**: `../../Energia.ie/Energia/wwwroot/dist`
- **Colors**: Green #00a651
- **Components**: 10 common components
- **Theme**: `@feframework/themes/energia/bootstrap.scss`

#### PowerNI
- **Output**: `../../PowerNI.ie/PowerNI/wwwroot/dist`
- **Colors**: Blue #0066b3
- **Components**: 10 common components
- **Theme**: `@feframework/themes/powerni/bootstrap.scss`

## Directory Structure

```
Energia.ie/Energia/wwwroot/dist/    # Energia brand only
├── components/
│   ├── alert/
│   ├── button/
│   ├── card/
│   └── ...

PowerNI.ie/PowerNI/wwwroot/dist/    # PowerNI brand only
├── components/
│   ├── alert/
│   ├── button/
│   ├── card/
│   └── ...
```

Each brand has its own **completely separate** build output.

## Adding a New Brand

### 1. Create Brand Configuration

Edit `brands.config.ts`:

```typescript
export const brands: Record<string, BrandConfig> = {
  // ... existing brands

  newbrand: {
    id: 'newbrand',
    name: 'New Brand',
    colors: {
      primary: '#ff6600',
      secondary: '#cc5200',
    },
    outputPath: '../../NewBrand.ie/NewBrand/wwwroot/dist',
    components: {
      common: [
        'alert',
        'button',
        'card',
        // ... select which components this brand needs
      ],
      // Optional: brand-specific components
      exclusive: ['newbrand-special-widget'],
      // Optional: exclude components this brand doesn't need
      exclude: ['hero'], // NewBrand doesn't use hero
    },
    theme: {
      path: '@feframework/themes/newbrand/bootstrap.scss',
    },
  },
};
```

### 2. Create Brand Theme

Create theme files in `packages/themes/newbrand/`:

```
packages/themes/newbrand/
├── tokens.scss          # Brand-specific design tokens
├── bootstrap.scss       # Bootstrap overrides
└── swiper-newbrand.scss # Swiper customization
```

**tokens.scss:**
```scss
@use '../_base/tokens' as base;

// Override base tokens
$primary: #ff6600;
$secondary: #cc5200;
```

**bootstrap.scss:**
```scss
@import './tokens';

// Override Bootstrap variables
$theme-colors: (
  'primary': $primary,
  'secondary': $secondary,
);

@import 'bootstrap/scss/bootstrap';
```

### 3. Build the New Brand

```bash
npm run build:kentico -- --brand=newbrand
```

## Brand-Specific Components

### Creating Exclusive Components

1. **Create the component** in `packages/ui/src/components/`:

```
packages/ui/src/components/NewBrandWidget/
├── NewBrandWidget.tsx
├── NewBrandWidget.types.ts
├── NewBrandWidget.bootstrap.scss
├── NewBrandWidget.test.tsx
├── NewBrandWidget.stories.tsx
└── index.ts
```

2. **Add to brand config**:

```typescript
newbrand: {
  // ...
  components: {
    common: ['alert', 'button', ...],
    exclusive: ['newbrand-widget'], // Only for NewBrand
  },
}
```

3. **Build**: The component will only be included in NewBrand's build.

### Excluding Components

If a brand doesn't need certain components:

```typescript
powerni: {
  // ...
  components: {
    common: ['alert', 'button', 'card', ...],
    exclude: ['hero', 'carousel'], // PowerNI doesn't use these
  },
}
```

## Component Categories

### CSS-Only Components
No JavaScript functionality required:
- Alert
- Button
- Card
- Footer
- FormInput
- FormSelect
- Hero

**Output**: `component.html` + `component.min.css`

### Interactive Components
Require JavaScript:
- **Modal** - Open/close, focus trap, ESC key
- **Carousel** - Swiper integration, navigation
- **Navbar** - Mobile toggle, responsive menu

**Output**: `component.html` + `component.min.css` + `component.min.js`

This is configured in `brands.config.ts`:

```typescript
export function isInteractiveComponent(componentName: string): boolean {
  const interactiveComponents = ['modal', 'carousel', 'navbar'];
  return interactiveComponents.includes(componentName);
}
```

## Build Commands

### Build Single Brand
```bash
npm run build:kentico -- --brand=energia
npm run build:kentico -- --brand=powerni
```

### Build All Brands
```bash
# Create a script in package.json
"build:kentico:all": "npm run build:kentico:energia && npm run build:kentico:powerni"
```

### Development Workflow
```bash
# 1. Build for specific brand
cd packages/ui
cmd //c "set BRAND=energia&& npx vite build --config vite.kentico.config.ts"

# 2. Files are automatically:
#    - Built to brand-specific output path
#    - Reorganized into component folders
#    - JS removed from CSS-only components
#    - HTML templates created with brand class
```

## Configuration API

### Available Functions

```typescript
// Get brand configuration
const config = getBrandConfig('energia');

// Get all brand IDs
const brands = getAvailableBrands(); // ['energia', 'powerni']

// Get components for a brand
const components = getBrandComponents('energia');
// Returns: ['alert', 'button', 'card', ...] (respects exclusions)

// Check if component needs JS
const needsJS = isInteractiveComponent('modal'); // true
const cssOnly = isInteractiveComponent('button'); // false
```

## Benefits

### 1. **Complete Separation**
Each brand has its own output directory - no shared folders, no conflicts.

### 2. **Flexible Component Sets**
Brands can:
- Share common components (code reuse)
- Have exclusive components (brand differentiation)
- Exclude unneeded components (smaller builds)

### 3. **Easy to Extend**
Adding a new brand is just:
1. Add config to `brands.config.ts`
2. Create theme files
3. Run build command

### 4. **Type-Safe**
TypeScript interfaces ensure configuration validity.

### 5. **Maintainable**
- Single source of truth (`brands.config.ts`)
- Centralized component categorization
- Clear brand boundaries

## Migration from Old System

**Old approach:**
```
dist/
├── energia/
│   └── components/
└── powerni/
    └── components/
```

**New approach:**
```
Energia.ie/Energia/wwwroot/dist/components/    # Completely separate
PowerNI.ie/PowerNI/wwwroot/dist/components/    # Completely separate
```

This better reflects that Energia and PowerNI are **separate websites** with **independent deployments**.

## Future Enhancements

### 1. Per-Component Configuration
```typescript
components: {
  common: [
    { name: 'button', variants: ['primary', 'secondary'] },
    { name: 'card', layout: 'horizontal' },
  ],
}
```

### 2. Layout Variations
```typescript
layouts: {
  energia: 'standard',
  powerni: 'compact',
}
```

### 3. Feature Flags
```typescript
features: {
  animations: true,
  darkMode: false,
  accessibility: 'WCAG-AA',
}
```

### 4. Multi-Platform Support
```typescript
platforms: {
  kentico: { outputPath: '...' },
  wordpress: { outputPath: '...' },
  strapi: { outputPath: '...' },
}
```

## Questions & Answers

**Q: Can two brands share the same component with different styling?**
A: Yes! Each brand has its own theme file that controls all component styling through Bootstrap variables.

**Q: What if I want a component in both brands but with different HTML structure?**
A: Create two separate components (e.g., `energia-hero`, `powerni-hero`) and mark them as exclusive to each brand.

**Q: Can I test changes for one brand without rebuilding all brands?**
A: Yes! Just build the specific brand: `npm run build:kentico -- --brand=energia`

**Q: How do I add a component that all brands will use?**
A: Add it to the `common` array in the brand config, and all brands will include it automatically.

**Q: What happens if I forget to add a theme file for a new brand?**
A: The Vite build will fail with a clear error showing which SCSS file is missing.
