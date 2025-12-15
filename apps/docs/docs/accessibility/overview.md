# Accessibility Overview

FEFramework is built with accessibility as a core principle, ensuring all components meet WCAG 2.1 AA standards.

## Compliance Level

<div className="a11y-badge">WCAG 2.1 AA</div>

All components are designed and tested to meet:
- **WCAG 2.1 Level AA** compliance
- **Section 508** requirements
- **EN 301 549** European accessibility standards

## Accessibility Features

### Keyboard Navigation

All interactive components are fully keyboard accessible:

- **Tab**: Navigate between focusable elements
- **Shift + Tab**: Navigate backwards
- **Enter/Space**: Activate buttons and links
- **Arrow Keys**: Navigate lists, menus, and carousels
- **Escape**: Close modals and dropdowns
- **Home/End**: Jump to first/last items in lists

### Screen Reader Support

Components work seamlessly with screen readers:

- **JAWS** - Tested and compatible
- **NVDA** - Tested and compatible
- **VoiceOver** - Tested and compatible
- **TalkBack** - Tested on mobile

### ARIA Attributes

Proper ARIA attributes for semantic meaning:

```tsx
<Button aria-disabled="true" aria-busy="true">
  Loading...
</Button>

<Modal
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <h2 id="modal-title">Modal Title</h2>
</Modal>
```

### Focus Management

Intelligent focus handling:

- Visible focus indicators (2px outline)
- Focus trap in modals
- Restore focus after closing dialogs
- Skip links for main content
- No keyboard traps

### Color Contrast

All color combinations meet WCAG standards:

- **Text**: 4.5:1 contrast ratio (AA)
- **Large Text**: 3:1 contrast ratio (AA)
- **UI Components**: 3:1 contrast ratio (AA)
- **High Contrast Mode**: Supported

## Accessibility Utilities

FEFramework provides helper utilities for building accessible applications:

### Focus Trap

```tsx
import { createFocusTrap } from '@feframework/ui/a11y';

const cleanup = createFocusTrap(modalElement);
// Focus is now trapped in modal
// Call cleanup() to release
```

### ARIA Helpers

```tsx
import {
  generateAriaId,
  generateDescribedBy,
  generateLabelledBy
} from '@feframework/ui/a11y';

const labelId = generateAriaId('label');
const descId = generateDescribedBy('input', errorId);
```

### Keyboard Navigation

```tsx
import {
  handleListNavigation,
  handleEscapeKey
} from '@feframework/ui/a11y';

// Handle arrow key navigation in lists
handleListNavigation(event, items, currentIndex);

// Handle escape key
handleEscapeKey(event, closeModal);
```

### Screen Reader Announcements

```tsx
import { announce, announceError } from '@feframework/ui/a11y';

// Announce to screen readers
announce('Form submitted successfully', 'polite');

// Announce errors immediately
announceError('Invalid email address');
```

### Color Contrast Validation

```tsx
import {
  getContrastRatio,
  meetsWCAGAA,
  verifyContrast
} from '@feframework/ui/a11y';

const ratio = getContrastRatio('#00a651', '#ffffff');
// Returns: 3.8

const meetsAA = meetsWCAGAA('#00a651', '#ffffff');
// Returns: false (needs 4.5:1 for normal text)

const result = verifyContrast('#00a651', '#ffffff', 'normal');
// Returns: { meetsAA: false, meetsAAA: false, ratio: 3.8 }
```

## Component-Specific Features

### Button

- Disabled state with `aria-disabled`
- Loading state with `aria-busy`
- Active state with `aria-pressed`
- Focus-visible for keyboard users

### FormInput

- Associated labels with `for`/`id`
- Error messages with `aria-describedby`
- Required fields with `required` and `aria-required`
- Invalid state with `aria-invalid`

### FormSelect

- Keyboard navigation with arrow keys
- Type-ahead search
- Clear announcement of selected option

### Modal

- Focus trap to prevent tabbing outside
- Focus restoration on close
- `role="dialog"` and `aria-modal="true"`
- Escape key to close
- Backdrop click to close

### Navbar

- Semantic `<nav>` element
- `aria-current` for active links
- Mobile toggle with `aria-expanded`
- Keyboard navigation

### Carousel

- `role="region"` with `aria-label`
- Slide `role="group"` with `aria-label`
- Keyboard controls
- Pause on hover/focus
- Previous/next with descriptive labels

## Testing

Every component includes accessibility tests:

```tsx
import { runAxeTest } from '@tests/a11y-utils';
import { Button } from '@feframework/ui';

test('Button has no a11y violations', async () => {
  const { container } = render(<Button>Click Me</Button>);
  await runAxeTest(container);
});
```

## Best Practices

### Always Provide Labels

```tsx
// Good
<FormInput label="Email" type="email" />

// Also good with aria-label
<Button aria-label="Close modal">
  <span aria-hidden="true">&times;</span>
</Button>

// Bad - no label
<FormInput type="email" />
```

### Use Semantic HTML

```tsx
// Good
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// Bad
<div onClick={navigate}>
  <div>Home</div>
</div>
```

### Provide Alternative Text

```tsx
// Good
<Card
  image="/hero.jpg"
  imageAlt="Solar panels on a residential roof"
/>

// Bad
<Card image="/hero.jpg" />
```

### Manage Focus

```tsx
// Good - restore focus after closing modal
const previousFocus = document.activeElement;
openModal();
// ... modal closes
previousFocus.focus();

// Bad - leave user lost after closing
openModal();
closeModal();
// User focus is lost
```

## High Contrast Mode

All components support Windows High Contrast Mode:

```scss
@media (prefers-contrast: high) {
  .button {
    border-width: 2px;
    outline-width: 3px;
  }
}
```

## Reduced Motion

Respect user motion preferences:

```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Next Steps

- Learn about [accessibility testing](./testing)
- View [component documentation](/docs/components/overview)
- Explore [Storybook a11y addon](http://localhost:6006)

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
