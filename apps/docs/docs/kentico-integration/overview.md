# Kentico Integration Overview

FEFramework includes a specialized build system for Kentico MVC projects that outputs standalone JavaScript and CSS bundles.

## What is Kentico Export?

The Kentico export system transforms the React component library into IIFE (Immediately Invoked Function Expression) bundles that can be used directly in Kentico MVC views without a build step.

## Output Structure

When you run a Kentico build, files are exported to `../Web/wwwroot/dist/`:

```
Web/wwwroot/dist/
├── css/
│   └── main.min.css           # Main styles (Bootstrap + custom)
├── js/
│   └── main.min.js            # React + ReactDOM + initialization
├── components/
│   ├── button/
│   │   ├── button.min.js      # Button component IIFE
│   │   └── button.min.css     # Button styles
│   ├── card/
│   │   ├── card.min.js
│   │   └── card.min.css
│   └── ... (10 components total)
├── assets/
│   ├── fonts/                 # Web fonts
│   └── images/                # Images and icons
└── manifest.json              # Build metadata
```

## Build Process

### 1. Component Discovery

The build system automatically discovers all components in `src/components/`:

```ts
// Auto-discovered:
// - Button
// - FormInput
// - FormSelect
// - Alert
// - Card
// - Hero
// - Footer
// - Navbar
// - Modal
// - Carousel
```

### 2. Brand-Specific Builds

Build for Energia:
```bash
pnpm build:kentico:energia
```

Build for PowerNI:
```bash
pnpm build:kentico:powerni
```

### 3. Optimization

- **PurgeCSS**: Removes unused CSS (reduces file size by ~80%)
- **Terser**: Minifies JavaScript
- **Code Splitting**: Each component is a separate bundle
- **Asset Optimization**: Fonts and images are copied to assets folder

## Features

### Auto-Mount System

Components automatically mount when using data attributes:

```html
<div data-component="Button" data-props='{"variant":"primary"}'>
  Loading...
</div>
```

### Manual Mount API

Programmatically mount components:

```js
window.FEFramework.mount('my-button', 'Button', {
  variant: 'primary',
  onClick: () => alert('Clicked!')
});
```

### Component Registry

All components are registered in `window.FEFramework.components`:

```js
const { Button, Card, Hero } = window.FEFramework.components;
```

## Manifest File

Each build generates `manifest.json` with metadata:

```json
{
  "version": "1.0.0",
  "cssFramework": "bootstrap",
  "brand": "energia",
  "buildDate": "2024-12-13T14:00:00.000Z",
  "components": [
    {
      "name": "Button",
      "files": {
        "js": "components/button/button.min.js",
        "css": "components/button/button.min.css"
      },
      "dependencies": ["react", "react-dom"],
      "size": {
        "js": 12450,
        "css": 3200
      }
    }
  ],
  "main": {
    "js": "js/main.min.js",
    "css": "css/main.min.css",
    "size": {
      "js": 145000,
      "css": 48000
    }
  }
}
```

## Configuration

### Environment Variables

```bash
# .env
KENTICO_OUTPUT_PATH=../Web/wwwroot/dist
BRAND=energia
```

### Build Script Options

```bash
# Build with specific brand
pnpm build:kentico --brand=energia

# Build with custom output path
KENTICO_OUTPUT_PATH=/custom/path pnpm build:kentico --brand=powerni
```

## Next Steps

- Learn [how to use components in Kentico](./usage)
- Understand the [manifest file](./manifest)
- View [component documentation](/docs/components/overview)

## Troubleshooting

### Output Path Not Found

Ensure the output directory exists:

```bash
mkdir -p ../Web/wwwroot/dist
```

### Build Fails

Check that all dependencies are installed:

```bash
pnpm install
```

### Large File Sizes

Ensure PurgeCSS is enabled in `purgecss.config.js`:

```js
module.exports = {
  content: ['src/**/*.{tsx,jsx,ts,js}'],
  css: ['dist/**/*.css'],
  safelist: [/^swiper/, 'sr-only', 'visually-hidden'],
};
```
