# Creating Custom Themes

Step-by-step guide to creating a new brand theme for FEFramework.

## Overview

Creating a custom theme involves:
1. Creating token overrides
2. Configuring Bootstrap variables
3. Adding brand-specific component styles
4. Building and testing

## Step 1: Create Theme Directory

```bash
cd packages/themes
mkdir my-brand
cd my-brand
```

## Step 2: Create Token File

Create `tokens.scss` with your brand colors:

```scss title="packages/themes/my-brand/tokens.scss"
/**
 * MyBrand Theme Tokens
 */

// Import base tokens
@use '../_base/tokens' as base;

// Override primary colors
$primary: #ff6600;        // Your brand primary
$secondary: #cc5200;      // Your brand secondary
$accent: #ffaa00;         // Your brand accent

// Override other tokens as needed
$success: base.$success;
$danger: base.$danger;
$warning: base.$warning;
$info: base.$info;

// Typography overrides (optional)
$font-family-base: 'Inter', sans-serif;

// Export all tokens
:export {
  primary: $primary;
  secondary: $secondary;
  accent: $accent;
}
```

## Step 3: Create Bootstrap Override

Create `bootstrap.scss` to customize Bootstrap:

```scss title="packages/themes/my-brand/bootstrap.scss"
/**
 * MyBrand Bootstrap Theme
 */

// Import MyBrand tokens
@use './tokens' as mybrand;

// Override Bootstrap variables
$primary: mybrand.$primary;
$secondary: mybrand.$secondary;

// Additional Bootstrap variable overrides
$border-radius: 0.5rem;
$font-family-sans-serif: mybrand.$font-family-base;

// Import Bootstrap
@import 'bootstrap/scss/bootstrap';

// Brand-specific global styles
body.brand-mybrand {
  --bs-primary: #{mybrand.$primary};
  --bs-secondary: #{mybrand.$secondary};
}
```

## Step 4: Create Component Overrides

Create Swiper theme (if using Carousel):

```scss title="packages/themes/my-brand/swiper-mybrand.scss"
/**
 * MyBrand Swiper Theme
 */

@use './tokens' as mybrand;
@use '../_base/swiper-base' as swiper;

// Override Swiper colors
.swiper {
  --swiper-theme-color: #{mybrand.$primary};
  --swiper-navigation-color: #{mybrand.$primary};
  --swiper-pagination-color: #{mybrand.$primary};
}

// Custom navigation button styles
.swiper-button-next,
.swiper-button-prev {
  background-color: rgba(mybrand.$primary, 0.9);
  border-radius: 50%;
  width: 48px;
  height: 48px;

  &::after {
    font-size: 20px;
    color: white;
  }
}
```

## Step 5: Update Package Exports

Add your theme to `packages/themes/package.json`:

```json
{
  "exports": {
    "./energia/*": "./energia/*",
    "./powerni/*": "./powerni/*",
    "./my-brand/*": "./my-brand/*"
  }
}
```

## Step 6: Create Brand Configuration

Add to `feframework.config.ts`:

```ts title="feframework.config.ts"
export const mybrandConfig: FEFrameworkConfig = {
  cssFramework: 'bootstrap',
  version: {
    bootstrap: '5.3.8',
  },
  brand: 'mybrand',
  purgecss: {
    enabled: true,
    safelist: [
      /^swiper/,
      'sr-only',
      'visually-hidden',
      // Add brand-specific classes
      'brand-mybrand',
    ],
  },
  a11y: {
    enforceStandards: 'WCAG2.1-AA',
    autoFocusManagement: true,
  },
};
```

## Step 7: Test Color Contrast

Ensure WCAG 2.1 AA compliance:

```tsx
import { getContrastRatio, meetsWCAGAA } from '@feframework/ui/a11y';

const primaryContrast = getContrastRatio('#ff6600', '#ffffff');
console.log('Primary on white:', primaryContrast); // Should be >= 4.5

const meetsAA = meetsWCAGAA('#ff6600', '#ffffff');
console.log('Meets WCAG AA:', meetsAA); // Should be true
```

## Step 8: Build Kentico Export

Add build script for your brand:

```json title="package.json"
{
  "scripts": {
    "build:kentico:mybrand": "pnpm build:kentico --brand=mybrand"
  }
}
```

Run the build:

```bash
pnpm build:kentico:mybrand
```

## Step 9: Add to Storybook

Update Storybook brand switcher:

```tsx title=".storybook/preview.ts"
globalTypes: {
  brand: {
    items: [
      { value: 'energia', title: 'Energia' },
      { value: 'powerni', title: 'PowerNI' },
      { value: 'mybrand', title: 'MyBrand' },
    ],
  },
}
```

## Example: Complete Theme

Here's a complete example for a fictional "SolarCo" brand:

```scss title="packages/themes/solarco/tokens.scss"
@use '../_base/tokens' as base;

// SolarCo orange and yellow
$primary: #ff6600;
$secondary: #cc5200;
$accent: #ffaa00;

// Keep base semantic colors
$success: base.$success;
$danger: base.$danger;
$warning: #ffaa00; // Use accent for warnings
$info: base.$info;

// Custom font
$font-family-base: 'Montserrat', sans-serif;

// Slightly larger base size
$font-size-base: 1.0625rem; // 17px

// More rounded corners
$border-radius: 0.5rem;
$border-radius-lg: 1rem;

// Stronger shadows
$box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
$box-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);
```

```scss title="packages/themes/solarco/bootstrap.scss"
@use './tokens' as solarco;

$primary: solarco.$primary;
$secondary: solarco.$secondary;
$warning: solarco.$warning;

$font-family-sans-serif: solarco.$font-family-base;
$font-size-base: solarco.$font-size-base;
$border-radius: solarco.$border-radius;
$border-radius-lg: solarco.$border-radius-lg;
$box-shadow: solarco.$box-shadow;
$box-shadow-lg: solarco.$box-shadow-lg;

@import 'bootstrap/scss/bootstrap';

body.brand-solarco {
  --bs-primary: #{solarco.$primary};
  --bs-secondary: #{solarco.$secondary};
}
```

## Usage

```tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '@feframework/themes/solarco/bootstrap.scss';

function App() {
  return (
    <div className="brand-solarco">
      <Button brand="solarco" variant="primary">
        SolarCo Button
      </Button>
    </div>
  );
}
```

## Checklist

Before releasing your custom theme:

- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 for text)
- [ ] Tested in high contrast mode
- [ ] Tested with screen readers
- [ ] All components themed consistently
- [ ] Storybook brand switcher includes new brand
- [ ] Kentico build succeeds
- [ ] Documentation updated
- [ ] Design tokens documented

## Next Steps

- View [design tokens reference](./tokens)
- Learn about [theming system](./overview)
- Test in [Storybook](http://localhost:6006)
