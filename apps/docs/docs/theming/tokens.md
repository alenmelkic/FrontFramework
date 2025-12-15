# Design Tokens

Complete reference of all design tokens in the FEFramework theming system.

## Color Tokens

### Brand Colors

```scss
$primary: #00a651;      // Main brand color
$secondary: #005826;    // Supporting brand color
$accent: #ffd100;       // Accent/highlight color
```

### Semantic Colors

```scss
$success: #198754;      // Success states
$danger: #dc3545;       // Error/danger states
$warning: #ffc107;      // Warning states
$info: #0dcaf0;         // Informational states
```

### Neutral Colors

```scss
$white: #ffffff;
$gray-100: #f8f9fa;
$gray-200: #e9ecef;
$gray-300: #dee2e6;
$gray-400: #ced4da;
$gray-500: #adb5bd;
$gray-600: #6c757d;
$gray-700: #495057;
$gray-800: #343a40;
$gray-900: #212529;
$black: #000000;
```

## Spacing Tokens

Based on 4px grid system:

```scss
$spacer-1: 4px;      // 0.25rem
$spacer-2: 8px;      // 0.5rem
$spacer-3: 12px;     // 0.75rem
$spacer-4: 16px;     // 1rem
$spacer-5: 20px;     // 1.25rem
$spacer-6: 24px;     // 1.5rem
$spacer-8: 32px;     // 2rem
$spacer-10: 40px;    // 2.5rem
$spacer-12: 48px;    // 3rem
$spacer-16: 64px;    // 4rem
$spacer-20: 80px;    // 5rem
$spacer-24: 96px;    // 6rem
```

## Typography Tokens

### Font Families

```scss
$font-family-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
$font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, monospace;
$font-family-base: $font-family-sans-serif;
```

### Font Sizes

```scss
$font-size-base: 1rem;        // 16px
$font-size-sm: 0.875rem;      // 14px
$font-size-lg: 1.125rem;      // 18px
$font-size-xl: 1.25rem;       // 20px
$font-size-2xl: 1.5rem;       // 24px
$font-size-3xl: 1.875rem;     // 30px
$font-size-4xl: 2.25rem;      // 36px
```

### Font Weights

```scss
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
```

### Line Heights

```scss
$line-height-tight: 1.25;
$line-height-base: 1.5;
$line-height-relaxed: 1.75;
```

## Border Tokens

### Border Radius

```scss
$border-radius-sm: 0.125rem;   // 2px
$border-radius: 0.25rem;       // 4px
$border-radius-md: 0.375rem;   // 6px
$border-radius-lg: 0.5rem;     // 8px
$border-radius-xl: 0.75rem;    // 12px
$border-radius-2xl: 1rem;      // 16px
$border-radius-full: 9999px;   // Fully rounded
```

### Border Widths

```scss
$border-width: 1px;
$border-width-thick: 2px;
$border-width-thicker: 4px;
```

## Shadow Tokens

```scss
$box-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
$box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
$box-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05);
$box-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
$box-shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
```

## Transition Tokens

```scss
$transition-fast: 150ms ease-in-out;
$transition-base: 300ms ease-in-out;
$transition-slow: 500ms ease-in-out;
```

## Z-Index Tokens

```scss
$zindex-dropdown: 1000;
$zindex-sticky: 1020;
$zindex-fixed: 1030;
$zindex-modal-backdrop: 1040;
$zindex-modal: 1050;
$zindex-popover: 1060;
$zindex-tooltip: 1070;
```

## Usage in SCSS

```scss
@use '@feframework/themes/_base/tokens' as *;

.custom-component {
  padding: $spacer-4;
  margin-bottom: $spacer-6;
  background-color: $primary;
  color: $white;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-md;
  transition: all $transition-base;

  &:hover {
    box-shadow: $box-shadow-lg;
  }
}
```

## CSS Custom Properties

Tokens are also available as CSS custom properties:

```css
:root {
  --primary: #00a651;
  --secondary: #005826;
  --spacer-4: 16px;
  --border-radius: 0.25rem;
  --transition-base: 300ms ease-in-out;
}

.custom-element {
  color: var(--primary);
  padding: var(--spacer-4);
  border-radius: var(--border-radius);
}
```

## Brand-Specific Overrides

### Energia

```scss
$primary: #00a651;
$secondary: #005826;
$accent: #ffd100;
```

### PowerNI

```scss
$primary: #0066b3;
$secondary: #004080;
$accent: #00a8e1;
```

## Next Steps

- Learn about [creating custom themes](./creating-themes)
- View [theming overview](./overview)
- Explore tokens in [Storybook](http://localhost:6006)
