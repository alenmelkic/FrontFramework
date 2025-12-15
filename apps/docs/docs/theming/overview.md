# Theming Overview

FEFramework's flexible theming system allows you to customize the component library for your brand.

## Multi-Brand Architecture

FEFramework supports multiple brand themes out of the box:

- **Energia** - Green theme (#00a651)
- **PowerNI** - Blue theme (#0066b3)
- **Custom** - Create your own brand theme

## How Theming Works

The theming system is built on three layers:

### 1. Base Tokens

Foundation design tokens that define:
- Color palette
- Spacing scale
- Typography
- Border radius
- Shadows
- Transitions

Located in `packages/themes/_base/tokens.scss`

### 2. Brand Themes

Brand-specific overrides that customize:
- Primary/secondary colors
- Component-specific styling
- Bootstrap variable overrides

Located in:
- `packages/themes/energia/`
- `packages/themes/powerni/`

### 3. Component Styles

Component-specific styles that:
- Respect brand tokens
- Apply Bootstrap classes
- Add custom functionality

## Using Brand Themes

### Import a Brand Theme

```tsx
// Energia theme
import 'bootstrap/dist/css/bootstrap.min.css';
import '@feframework/themes/energia/bootstrap.scss';
```

```tsx
// PowerNI theme
import 'bootstrap/dist/css/bootstrap.min.css';
import '@feframework/themes/powerni/bootstrap.scss';
```

### Apply Brand to Components

```tsx
<Button brand="energia" variant="primary">
  Energia Button
</Button>

<Button brand="powerni" variant="primary">
  PowerNI Button
</Button>
```

### Dynamic Brand Switching

```tsx
function App() {
  const [brand, setBrand] = useState<'energia' | 'powerni'>('energia');

  useEffect(() => {
    // Dynamically load brand CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/themes/${brand}/bootstrap.css`;
    document.head.appendChild(link);

    return () => link.remove();
  }, [brand]);

  return (
    <div className={`brand-${brand}`}>
      <Button brand={brand} onClick={() => setBrand(brand === 'energia' ? 'powerni' : 'energia')}>
        Switch to {brand === 'energia' ? 'PowerNI' : 'Energia'}
      </Button>
    </div>
  );
}
```

## Brand Color Palettes

### Energia

```css
Primary: #00a651 (Green)
Secondary: #005826 (Dark Green)
Accent: #ffd100 (Yellow)
```

### PowerNI

```css
Primary: #0066b3 (Blue)
Secondary: #004080 (Dark Blue)
Accent: #00a8e1 (Light Blue)
```

## Design Tokens

### Color Tokens

```scss
$primary: #00a651;
$secondary: #005826;
$success: #198754;
$danger: #dc3545;
$warning: #ffc107;
$info: #0dcaf0;
```

### Spacing Tokens

```scss
$spacer-1: 4px;
$spacer-2: 8px;
$spacer-3: 12px;
$spacer-4: 16px;
$spacer-6: 24px;
$spacer-8: 32px;
$spacer-12: 48px;
```

### Typography Tokens

```scss
$font-size-base: 1rem;
$font-size-sm: 0.875rem;
$font-size-lg: 1.125rem;
$font-weight-normal: 400;
$font-weight-bold: 700;
```

## Bootstrap Integration

FEFramework leverages Bootstrap 5's customization system:

```scss
// Override Bootstrap variables
$primary: #00a651;
$secondary: #005826;

// Import Bootstrap
@import 'bootstrap/scss/bootstrap';
```

## Accessibility Considerations

All brand themes must:

- Maintain **4.5:1** contrast ratio for text (WCAG AA)
- Maintain **3:1** contrast ratio for UI components
- Support high contrast mode
- Support dark mode (coming in Phase 2)

## Next Steps

- Learn about [design tokens](./tokens) in detail
- Create a [custom theme](./creating-themes)
- View themes in [Storybook](http://localhost:6006)

## Related

- [Components Overview](/docs/components/overview)
- [Accessibility](/docs/accessibility/overview)
