# FEFramework Documentation

Documentation site for the FEFramework component library, built with Docusaurus.

## Features

- **Getting Started** - Installation and quick start guides
- **Component Documentation** - Detailed docs for all 10 components
- **Theming Guide** - Multi-brand theming and customization
- **Kentico Integration** - Using components in Kentico MVC
- **Accessibility** - WCAG 2.1 AA compliance and testing
- **Code Examples** - Copy-paste ready code snippets

## Running Locally

From the root directory:

```bash
npm run docs
```

Or from this directory:

```bash
npm start
```

Documentation will be available at [http://localhost:3000](http://localhost:3000)

## Building

To build a static version:

```bash
npm run build
```

Output will be in the `build/` directory.

## Structure

```
docs/
├── getting-started/
│   ├── installation.md
│   └── quick-start.md
├── components/
│   ├── overview.md
│   ├── button.md
│   └── ... (10 components)
├── theming/
│   ├── overview.md
│   ├── tokens.md
│   └── creating-themes.md
├── kentico-integration/
│   ├── overview.md
│   ├── usage.md
│   └── manifest.md
└── accessibility/
    ├── overview.md
    └── testing.md
```

## Customization

### Theme Colors

Edit `src/css/custom.css` to customize the Energia green brand colors:

```css
:root {
  --ifm-color-primary: #00a651;
  --ifm-color-primary-dark: #009549;
  /* ... */
}
```

### Navigation

Edit `docusaurus.config.ts` to modify the navbar and footer.

### Sidebar

Edit `sidebars.ts` to change the documentation structure.

## Deployment

The documentation site can be deployed to:

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Any static hosting**

Configure deployment in `docusaurus.config.ts`:

```ts
url: 'https://your-domain.com',
baseUrl: '/',
```

Then build and deploy:

```bash
npm run build
# Deploy the build/ directory
```

## Writing Documentation

### Creating New Pages

1. Create a markdown file in `docs/`
2. Add frontmatter:

```md
---
title: Page Title
sidebar_position: 1
---

# Page Content
```

3. Add to `sidebars.ts`

### Code Blocks

````md
```tsx title="example.tsx"
import { Button } from '@feframework/ui';

function App() {
  return <Button>Click Me</Button>;
}
```
````

### Callouts

```md
:::tip
This is a helpful tip
:::

:::warning
This is a warning
:::

:::danger
This is dangerous
:::
```

## Links

- [Docusaurus Documentation](https://docusaurus.io/)
- [FEFramework Storybook](http://localhost:6006)
- [Main Project README](../../README.md)
