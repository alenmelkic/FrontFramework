# Accessibility Testing

Comprehensive guide to testing accessibility in FEFramework.

## Automated Testing

### jest-axe Integration

All components are tested with jest-axe:

```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '@feframework/ui';

expect.extend(toHaveNoViolations);

test('Button has no accessibility violations', async () => {
  const { container } = render(<Button>Click Me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Custom A11y Utility

Use the provided test utility:

```tsx
import { runAxeTest } from '@tests/a11y-utils';
import { FormInput } from '@feframework/ui';

test('FormInput is accessible', async () => {
  const { container } = render(
    <FormInput label="Email" type="email" />
  );
  await runAxeTest(container);
});
```

### Run All A11y Tests

```bash
npm test -- --testNamePattern="a11y|accessibility"
```

## Manual Testing

### Keyboard Navigation

Test all interactive elements with keyboard only:

1. **Tab through the page**
   - All interactive elements should be reachable
   - Tab order should be logical
   - Focus indicator should be visible

2. **Use Enter/Space**
   - Buttons should activate
   - Links should navigate
   - Form controls should toggle

3. **Use Arrow Keys**
   - Navigate lists and menus
   - Move through carousel slides
   - Navigate form options

4. **Use Escape**
   - Close modals
   - Close dropdowns
   - Cancel actions

### Screen Reader Testing

#### NVDA (Windows - Free)

1. Download from [nvaccess.org](https://www.nvaccess.org/)
2. Press `NVDA + N` to open menu
3. Navigate your app with:
   - `Tab` - Next element
   - `NVDA + Down` - Read next item
   - `Insert + F7` - List all headings/links/regions

#### JAWS (Windows - Commercial)

1. Start JAWS
2. Navigate with:
   - `Tab` - Next element
   - `H` - Next heading
   - `B` - Next button
   - `F` - Next form field

#### VoiceOver (macOS - Built-in)

1. Enable: `Cmd + F5`
2. Navigate with:
   - `VO + Right Arrow` - Next item
   - `VO + Cmd + H` - Next heading
   - `Tab` - Next form field

### Color Contrast Testing

#### Browser DevTools

Chrome/Edge DevTools:
1. Inspect element
2. View "Accessibility" tab
3. Check contrast ratio

#### WebAIM Contrast Checker

[https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)

Test all color combinations:
- Energia green (#00a651) on white
- PowerNI blue (#0066b3) on white
- Text on brand backgrounds

#### Automated Contrast Check

```tsx
import { getContrastRatio, meetsWCAGAA } from '@feframework/ui/a11y';

// Test Energia primary color
const ratio = getContrastRatio('#00a651', '#ffffff');
console.log('Contrast ratio:', ratio); // 3.8:1

const passes = meetsWCAGAA('#00a651', '#ffffff', 'normal');
console.log('Meets WCAG AA:', passes); // false - use for large text only
```

## Storybook A11y Addon

View accessibility violations in Storybook:

1. Open Storybook: `npm run storybook`
2. Select a component story
3. Click "Accessibility" tab
4. Review any violations or warnings

### Configure A11y Rules

In `.storybook/preview.ts`:

```tsx
a11y: {
  config: {
    rules: [
      {
        id: 'color-contrast',
        enabled: true,
      },
      {
        id: 'label',
        enabled: true,
      },
    ],
  },
  options: {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa'],
    },
  },
}
```

## Component-Specific Testing

### Button Tests

```tsx
describe('Button Accessibility', () => {
  it('has no violations', async () => {
    const { container } = render(<Button>Click</Button>);
    await runAxeTest(container);
  });

  it('disabled state', () => {
    render(<Button disabled>Click</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('loading state', () => {
    render(<Button loading>Click</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('keyboard activation', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByRole('button');

    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### FormInput Tests

```tsx
describe('FormInput Accessibility', () => {
  it('associates label with input', () => {
    render(<FormInput label="Email" id="email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();
  });

  it('error message linked via aria-describedby', () => {
    render(<FormInput label="Email" error="Invalid email" />);
    const input = screen.getByLabelText('Email');
    const errorId = input.getAttribute('aria-describedby');
    const error = document.getElementById(errorId);
    expect(error).toHaveTextContent('Invalid email');
  });

  it('required attribute', () => {
    render(<FormInput label="Email" required />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-required', 'true');
  });
});
```

### Modal Tests

```tsx
describe('Modal Accessibility', () => {
  it('has dialog role', () => {
    render(<Modal isOpen title="Test">Content</Modal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('traps focus', () => {
    render(<Modal isOpen title="Test">
      <button>First</button>
      <button>Last</button>
    </Modal>);

    const buttons = screen.getAllByRole('button');
    buttons[1].focus();
    userEvent.tab();
    expect(buttons[0]).toHaveFocus(); // Wraps to first
  });

  it('restores focus on close', () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();

    const { rerender } = render(<Modal isOpen>Content</Modal>);
    expect(document.activeElement).not.toBe(trigger);

    rerender(<Modal isOpen={false}>Content</Modal>);
    expect(document.activeElement).toBe(trigger);
  });
});
```

## CI/CD Integration

### GitHub Actions

```yaml title=".github/workflows/a11y.yml"
name: Accessibility Tests

on: [push, pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm test -- --testNamePattern="a11y"
      - name: Upload a11y results
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: a11y-violations
          path: coverage/a11y-report.html
```

## Testing Checklist

Before releasing a component:

- [ ] No axe violations in automated tests
- [ ] Keyboard navigation works correctly
- [ ] Screen reader announces all content
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA
- [ ] Works in high contrast mode
- [ ] Respects prefers-reduced-motion
- [ ] Focus management in modals/dialogs
- [ ] ARIA attributes are correct
- [ ] Semantic HTML is used
- [ ] Storybook a11y addon shows no violations

## Common Issues

### Missing Label

```tsx
// Problem
<input type="text" />

// Solution
<FormInput label="Name" type="text" />
```

### Poor Contrast

```tsx
// Problem
<Button style={{ background: '#ffff00', color: '#ffffff' }}>
  Click Me
</Button>

// Solution - use brand colors that meet WCAG AA
<Button brand="energia" variant="primary">
  Click Me
</Button>
```

### Keyboard Trap

```tsx
// Problem
<div onKeyDown={(e) => e.preventDefault()}>
  <button>Trapped!</button>
</div>

// Solution - allow keyboard navigation
<div>
  <button>Free!</button>
</div>
```

### Missing Focus Management

```tsx
// Problem
function handleModalClose() {
  setIsOpen(false);
  // Focus is lost!
}

// Solution
function handleModalClose() {
  const previousFocus = document.activeElement;
  setIsOpen(false);
  previousFocus.focus();
}
```

## Next Steps

- Review [accessibility overview](./overview)
- View [component documentation](/docs/components/overview)
- Explore [Storybook](http://localhost:6006)

## Resources

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Pa11y](https://pa11y.org/)
