# Installation

Get started with FEFramework in your project.

## Prerequisites

Before installing FEFramework, ensure you have:

- **Node.js** >= 18.0
- **npm** >= 8.0 or **pnpm** >= 8.0
- **React** ^18.0.0 or ^19.0.0

## NPM Installation

Install the UI package and Bootstrap:

```bash
npm install @feframework/ui bootstrap
```

Or with pnpm:

```bash
pnpm add @feframework/ui bootstrap
```

## Theme Installation

Install the theme package for brand-specific styling:

```bash
npm install @feframework/themes
```

## Peer Dependencies

FEFramework requires React and ReactDOM as peer dependencies:

```bash
npm install react react-dom
```

## Optional Dependencies

### For Carousel Component

The Carousel component uses Swiper:

```bash
npm install swiper
```

### For Development

If you're contributing or building from source:

```bash
npm install --save-dev typescript vite sass
```

## Verify Installation

Create a test file to verify the installation:

```tsx title="App.tsx"
import { Button } from '@feframework/ui';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Button variant="primary" onClick={() => alert('Hello!')}>
      Click Me
    </Button>
  );
}

export default App;
```

## Next Steps

- [Quick Start Guide](./quick-start) - Build your first component
- [Components Overview](/docs/components/overview) - Explore all components
- [Theming Guide](/docs/theming/overview) - Customize for your brand

## Troubleshooting

### TypeScript Errors

If you encounter TypeScript errors, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "esModuleInterop": true
  }
}
```

### Missing CSS

If styles don't appear, make sure you're importing Bootstrap CSS:

```tsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

### Module Not Found

Clear your package manager cache:

```bash
npm cache clean --force
# or
pnpm store prune
```

Then reinstall dependencies.
