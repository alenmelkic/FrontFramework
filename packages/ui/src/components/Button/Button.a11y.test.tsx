/**
 * Button Component Accessibility Tests
 * Tests WCAG 2.1 AA compliance
 */

import { describe, it, expect } from 'vitest';
import { render } from '@tests/test-utils';
import { runAxeTest, testKeyboardNavigation, verifyAriaAttributes } from '@tests/a11y-utils';
import { Button } from './Button';

describe('Button Accessibility', () => {
  describe('Axe Violations', () => {
    it('should have no accessibility violations (default)', async () => {
      const { container } = render(<Button>Click Me</Button>);
      await runAxeTest(container);
    });

    it('should have no accessibility violations (all variants)', async () => {
      const variants = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
        'link',
        'outline-primary',
      ] as const;

      for (const variant of variants) {
        const { container } = render(<Button variant={variant}>{variant}</Button>);
        await runAxeTest(container);
      }
    });

    it('should have no accessibility violations (disabled)', async () => {
      const { container } = render(<Button disabled>Click Me</Button>);
      await runAxeTest(container);
    });

    it('should have no accessibility violations (loading)', async () => {
      const { container } = render(<Button loading>Click Me</Button>);
      await runAxeTest(container);
    });

    it('should have no accessibility violations (with aria-label)', async () => {
      const { container } = render(<Button aria-label="Custom Label">Click Me</Button>);
      await runAxeTest(container);
    });

    it('should have no accessibility violations (all sizes)', async () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      for (const size of sizes) {
        const { container } = render(<Button size={size}>Click Me</Button>);
        await runAxeTest(container);
      }
    });

    it('should have no accessibility violations (both brands)', async () => {
      const { container: energiaContainer } = render(<Button brand="energia">Energia</Button>);
      await runAxeTest(energiaContainer);

      const { container: powerniContainer } = render(<Button brand="powerni">PowerNI</Button>);
      await runAxeTest(powerniContainer);
    });
  });

  describe('ARIA Attributes', () => {
    it('should have proper ARIA attributes when disabled', () => {
      const { container } = render(<Button disabled>Click Me</Button>);
      const button = container.querySelector('button')!;

      verifyAriaAttributes(button, {
        'aria-disabled': 'true',
        'aria-busy': null,
      });
    });

    it('should have proper ARIA attributes when loading', () => {
      const { container } = render(<Button loading>Click Me</Button>);
      const button = container.querySelector('button')!;

      verifyAriaAttributes(button, {
        'aria-disabled': 'true',
        'aria-busy': 'true',
      });
    });

    it('should have proper ARIA attributes when neither disabled nor loading', () => {
      const { container } = render(<Button>Click Me</Button>);
      const button = container.querySelector('button')!;

      expect(button).not.toHaveAttribute('aria-disabled');
      expect(button).not.toHaveAttribute('aria-busy');
    });

    it('should support custom aria-label', () => {
      const { container } = render(<Button aria-label="Submit Form">Submit</Button>);
      const button = container.querySelector('button')!;

      verifyAriaAttributes(button, {
        'aria-label': 'Submit Form',
      });
    });

    it('should have aria-hidden on loading spinner', () => {
      const { container } = render(<Button loading>Loading</Button>);
      const spinner = container.querySelector('.btn-spinner')!;

      verifyAriaAttributes(spinner, {
        'aria-hidden': 'true',
        role: 'status',
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable via keyboard', async () => {
      const { container } = render(<Button>Click Me</Button>);
      const button = container.querySelector('button')!;

      await testKeyboardNavigation(button);
    });

    it('should not be focusable when disabled', () => {
      const { container } = render(<Button disabled>Click Me</Button>);
      const button = container.querySelector('button')!;

      // Disabled buttons should not be focusable
      expect(button).toBeDisabled();
      expect(document.activeElement).not.toBe(button);
    });

    it('should not be focusable when loading', () => {
      const { container } = render(<Button loading>Click Me</Button>);
      const button = container.querySelector('button')!;

      // Loading buttons should be disabled and not focusable
      expect(button).toBeDisabled();
      expect(document.activeElement).not.toBe(button);
    });
  });

  describe('Semantic HTML', () => {
    it('should use button element', () => {
      const { container } = render(<Button>Click Me</Button>);
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('should have implicit button role', () => {
      const { container } = render(<Button>Click Me</Button>);
      const button = container.querySelector('button')!;
      // Native button elements have implicit role="button", no need to set it explicitly
      expect(button.getAttribute('role')).toBeNull();
    });

    it('should have type attribute', () => {
      const { container } = render(<Button>Click Me</Button>);
      const button = container.querySelector('button')!;
      expect(button).toHaveAttribute('type');
    });
  });

  describe('Touch Target Size', () => {
    it('should have min-height and min-width CSS classes', () => {
      const { container } = render(<Button>Click Me</Button>);
      const button = container.querySelector('button')!;

      // Note: In JSDOM, getComputedStyle doesn't work properly
      // We verify the component has the correct CSS classes
      // The actual CSS ensures 44x44px minimum (tested in Bootstrap styles)
      expect(button).toHaveClass('btn');
    });

    it('should have small size class for small buttons', () => {
      const { container } = render(<Button size="sm">Click Me</Button>);
      const button = container.querySelector('button')!;

      // Small buttons have btn-sm class which sets min 38x38px
      expect(button).toHaveClass('btn-sm');
    });
  });

  describe('Focus Indicators', () => {
    it('should be focusable', () => {
      const { container } = render(<Button>Click Me</Button>);
      const button = container.querySelector('button')!;

      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('Color Contrast', () => {
    // Note: Actual contrast testing is done by axe
    // These tests verify that color-related classes are applied

    it('should apply correct classes for contrast', () => {
      const { container } = render(<Button variant="primary">Primary</Button>);
      const button = container.querySelector('button')!;

      expect(button).toHaveClass('btn-primary');
    });

    it('should apply correct classes for light variant', () => {
      const { container } = render(<Button variant="light">Light</Button>);
      const button = container.querySelector('button')!;

      expect(button).toHaveClass('btn-light');
    });

    it('should apply correct classes for dark variant', () => {
      const { container } = render(<Button variant="dark">Dark</Button>);
      const button = container.querySelector('button')!;

      expect(button).toHaveClass('btn-dark');
    });
  });

  describe('Screen Reader Support', () => {
    it('should announce loading state to screen readers', () => {
      const { container } = render(<Button loading>Loading</Button>);
      const button = container.querySelector('button')!;

      // Loading button should have aria-busy
      expect(button).toHaveAttribute('aria-busy', 'true');

      // Spinner should have role="status" for screen reader announcement
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toBeInTheDocument();
    });

    it('should not interfere with screen reader when not loading', () => {
      const { container } = render(<Button>Click Me</Button>);
      const button = container.querySelector('button')!;

      expect(button).not.toHaveAttribute('aria-busy');
      expect(container.querySelector('[role="status"]')).not.toBeInTheDocument();
    });
  });
});
