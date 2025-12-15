# Button

Interactive button component with multiple variants, sizes, and states.

<span className="brand-badge brand-badge--energia">Energia</span>
<span className="brand-badge brand-badge--powerni">PowerNI</span>
<span className="a11y-badge">WCAG 2.1 AA</span>

## Import

```tsx
import { Button } from '@feframework/ui';
import type { ButtonProps, ButtonVariant, ButtonSize } from '@feframework/ui';
```

## Basic Usage

```tsx
<Button variant="primary" onClick={() => console.log('Clicked!')}>
  Click Me
</Button>
```

## Variants

The Button component supports 8 Bootstrap variants:

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>
<Button variant="light">Light</Button>
<Button variant="dark">Dark</Button>
```

### Outline Variants

```tsx
<Button variant="outline-primary">Outline Primary</Button>
<Button variant="outline-secondary">Outline Secondary</Button>
```

## Sizes

```tsx
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>
```

## States

### Disabled

```tsx
<Button disabled>Disabled Button</Button>
```

### Loading

```tsx
<Button loading>Loading...</Button>
```

### Active

```tsx
<Button active>Active Button</Button>
```

## Brand Theming

### Energia

```tsx
<Button brand="energia" variant="primary">
  Energia Button
</Button>
```

### PowerNI

```tsx
<Button brand="powerni" variant="primary">
  PowerNI Button
</Button>
```

## Button Types

```tsx
<Button type="button">Button</Button>
<Button type="submit">Submit Form</Button>
<Button type="reset">Reset Form</Button>
```

## Props API

<div className="props-table">

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `'primary'` | Visual style variant |
| `size` | `ButtonSize` | `'md'` | Button size |
| `brand` | `'energia' \| 'powerni'` | `undefined` | Brand theming |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state with spinner |
| `active` | `boolean` | `false` | Active/pressed state |
| `type` | `ButtonType` | `'button'` | HTML button type |
| `onClick` | `(e: MouseEvent) => void` | `undefined` | Click handler |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | required | Button content |

</div>

### ButtonVariant Type

```tsx
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-light'
  | 'outline-dark';
```

### ButtonSize Type

```tsx
type ButtonSize = 'sm' | 'md' | 'lg';
```

### ButtonType Type

```tsx
type ButtonType = 'button' | 'submit' | 'reset';
```

## Accessibility Features

### Keyboard Support

- **Enter/Space**: Activates the button
- **Tab**: Moves focus to/from the button

### ARIA Attributes

- `aria-disabled="true"` when disabled
- `aria-busy="true"` when loading
- `aria-pressed="true"` when active

### Focus Management

- Visible focus indicator with 2px outline
- High contrast mode support
- `focus-visible` for keyboard-only focus

### Screen Reader Support

- Announces button state (disabled, loading, pressed)
- Loading state announced as "busy"
- Descriptive text for all buttons

## Examples

### Form Submit Button

```tsx
<form onSubmit={handleSubmit}>
  <FormInput label="Email" type="email" required />
  <Button type="submit" variant="primary" className="mt-3">
    Sign Up
  </Button>
</form>
```

### Async Action Button

```tsx
function AsyncButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await fetchData();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} loading={isLoading}>
      {isLoading ? 'Loading...' : 'Load Data'}
    </Button>
  );
}
```

### Button Group

```tsx
<div className="btn-group" role="group" aria-label="Actions">
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
  <Button variant="danger">Delete</Button>
</div>
```

### Icon Button

```tsx
<Button variant="primary" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</Button>
```

## Styling

### Custom Classes

```tsx
<Button className="w-100 mt-3 shadow-lg">
  Full Width Button
</Button>
```

### Custom Styles

```tsx
<Button style={{ borderRadius: '20px', padding: '12px 24px' }}>
  Rounded Button
</Button>
```

## Testing

### Unit Test Example

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@feframework/ui';

test('button click handler', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);

  fireEvent.click(screen.getByText('Click Me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Accessibility Test

```tsx
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from '@feframework/ui';

test('no accessibility violations', async () => {
  const { container } = render(<Button>Click Me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Related Components

- [FormInput](./form-input) - For text input fields
- [Alert](./alert) - For user feedback
- [Modal](./modal) - For dialogs with buttons

## Storybook

View all Button variations in [Storybook](http://localhost:6006/?path=/story/components-button--default).
