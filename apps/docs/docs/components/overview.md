# Components Overview

FEFramework provides 10 core components, all built with Bootstrap 5, fully accessible (WCAG 2.1 AA), and support for multi-brand theming.

## Component List

### Form Components

<div className="component-grid">

#### [Button](./button)
Interactive button with multiple variants, sizes, and loading states.
<span className="brand-badge brand-badge--energia">Energia</span>
<span className="brand-badge brand-badge--powerni">PowerNI</span>
<span className="a11y-badge">WCAG AA</span>

#### [FormInput](./form-input)
Text input field with label, validation, and error messaging.
<span className="brand-badge brand-badge--energia">Energia</span>
<span className="brand-badge brand-badge--powerni">PowerNI</span>
<span className="a11y-badge">WCAG AA</span>

#### [FormSelect](./form-select)
Dropdown select with label, validation, and keyboard navigation.
<span className="brand-badge brand-badge--energia">Energia</span>
<span className="brand-badge brand-badge--powerni">PowerNI</span>
<span className="a11y-badge">WCAG AA</span>

</div>

### Feedback Components

<div className="component-grid">

#### [Alert](./alert)
Notification banner with 8 variants and dismissible functionality.
<span className="brand-badge brand-badge--energia">Energia</span>
<span className="brand-badge brand-badge--powerni">PowerNI</span>
<span className="a11y-badge">WCAG AA</span>

#### [Modal](./modal)
Dialog overlay with focus trap and backdrop.
<span className="brand-badge brand-badge--energia">Energia</span>
<span className="brand-badge brand-badge--powerni">PowerNI</span>
<span className="a11y-badge">WCAG AA</span>

</div>

### Content Components

<div className="component-grid">

#### [Card](./card)
Flexible content card with image, header, body, and footer.
<span className="brand-badge brand-badge--energia">Energia</span>
<span className="brand-badge brand-badge--powerni">PowerNI</span>
<span className="a11y-badge">WCAG AA</span>

#### [Hero](./hero)
Full-width hero section with background image and CTA buttons.
<span className="brand-badge brand-badge--energia">Energia</span>
<span className="brand-badge brand-badge--powerni">PowerNI</span>
<span className="a11y-badge">WCAG AA</span>

#### [Carousel](./carousel)
Image carousel with Swiper integration and full accessibility.
<span className="brand-badge brand-badge--energia">Energia</span>
<span className="brand-badge brand-badge--powerni">PowerNI</span>
<span className="a11y-badge">WCAG AA</span>

</div>

### Navigation Components

<div className="component-grid">

#### [Navbar](./navbar)
Responsive navigation header with mobile toggle.
<span className="brand-badge brand-badge--energia">Energia</span>
<span className="brand-badge brand-badge--powerni">PowerNI</span>
<span className="a11y-badge">WCAG AA</span>

#### [Footer](./footer)
Multi-column footer with links, copyright, and social media.
<span className="brand-badge brand-badge--energia">Energia</span>
<span className="brand-badge brand-badge--powerni">PowerNI</span>
<span className="a11y-badge">WCAG AA</span>

</div>

## Common Features

All FEFramework components share these features:

### 🎨 Multi-Brand Support

Every component accepts a `brand` prop:

```tsx
<Button brand="energia">Energia Button</Button>
<Button brand="powerni">PowerNI Button</Button>
```

### ♿ Accessibility

- **WCAG 2.1 AA** compliant
- Full keyboard navigation
- Screen reader support
- Focus management
- ARIA attributes
- Color contrast verified

### 📘 TypeScript

Fully typed with TypeScript for better developer experience:

```tsx
import type { ButtonProps, ButtonVariant } from '@feframework/ui';
```

### 🎯 Bootstrap Integration

Built on Bootstrap 5 utility classes:

```tsx
<Button className="mt-3 px-4">Custom Spacing</Button>
```

### 🧪 Tested

- 80%+ code coverage
- Unit tests with Vitest
- Accessibility tests with jest-axe
- Visual regression tests in Storybook

## Usage Patterns

### Basic Import

```tsx
import { Button, Card, Alert } from '@feframework/ui';
```

### With Types

```tsx
import { Button } from '@feframework/ui';
import type { ButtonProps } from '@feframework/ui';

const CustomButton = (props: ButtonProps) => {
  return <Button {...props} />;
};
```

### Brand-Specific

```tsx
import { Button } from '@feframework/ui';

function EnergiaButton() {
  return <Button brand="energia" variant="primary">Click Me</Button>;
}

function PowerNIButton() {
  return <Button brand="powerni" variant="primary">Click Me</Button>;
}
```

## Storybook

Explore all components interactively in [Storybook](http://localhost:6006) with:

- Live component previews
- Interactive prop controls
- Brand switcher
- Accessibility checks
- Code examples

## Next Steps

- Browse individual [component documentation](./button)
- Check out [theming guide](/docs/theming/overview)
- Learn about [accessibility features](/docs/accessibility/overview)
- View [Kentico integration](/docs/kentico-integration/overview)
