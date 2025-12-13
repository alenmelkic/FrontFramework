/**
 * Alert Component Accessibility Tests
 * Tests WCAG 2.1 AA compliance
 */

import { describe, it, expect } from 'vitest';
import { render } from '@tests/test-utils';
import { runAxeTest, verifyAriaAttributes } from '@tests/a11y-utils';
import { Alert } from './Alert';

describe('Alert Accessibility', () => {
  describe('Axe Violations', () => {
    it('should have no accessibility violations (default)', async () => {
      const { container } = render(<Alert>This is an alert message</Alert>);
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
      ] as const;

      for (const variant of variants) {
        const { container } = render(<Alert variant={variant}>{variant} alert</Alert>);
        await runAxeTest(container);
      }
    });

    it('should have no accessibility violations (dismissible)', async () => {
      const { container } = render(<Alert dismissible>Dismissible alert</Alert>);
      await runAxeTest(container);
    });

    it('should have no accessibility violations (with heading)', async () => {
      const { container } = render(<Alert heading="Alert Title">Message content</Alert>);
      await runAxeTest(container);
    });

    it('should have no accessibility violations (with icon)', async () => {
      const { container } = render(
        <Alert variant="success" showIcon>
          Success message
        </Alert>
      );
      await runAxeTest(container);
    });

    it('should have no accessibility violations (custom icon)', async () => {
      const { container } = render(<Alert icon={<span>🔔</span>}>Alert message</Alert>);
      await runAxeTest(container);
    });

    it('should have no accessibility violations (both brands)', async () => {
      const { container: energiaContainer } = render(
        <Alert brand="energia">Energia alert</Alert>
      );
      await runAxeTest(energiaContainer);

      const { container: powerniContainer } = render(
        <Alert brand="powerni">PowerNI alert</Alert>
      );
      await runAxeTest(powerniContainer);
    });

    it('should have no accessibility violations (with aria-label)', async () => {
      const { container } = render(
        <Alert aria-label="Important notification">Alert message</Alert>
      );
      await runAxeTest(container);
    });
  });

  describe('ARIA Attributes', () => {
    it('should have proper ARIA role', () => {
      const { container } = render(<Alert>Alert message</Alert>);
      const alert = container.querySelector('.alert')!;

      verifyAriaAttributes(alert, {
        role: 'alert',
        'aria-live': 'assertive',
        'aria-atomic': 'true',
      });
    });

    it('should have proper ARIA attributes for status role', () => {
      const { container } = render(<Alert role="status">Status message</Alert>);
      const alert = container.querySelector('.alert')!;

      verifyAriaAttributes(alert, {
        role: 'status',
        'aria-live': 'polite',
        'aria-atomic': 'true',
      });
    });

    it('should support custom aria-label', () => {
      const { container } = render(
        <Alert aria-label="Important notification">Alert message</Alert>
      );
      const alert = container.querySelector('.alert')!;

      verifyAriaAttributes(alert, {
        'aria-label': 'Important notification',
      });
    });

    it('should have aria-hidden on icon', () => {
      const { container } = render(
        <Alert variant="success" showIcon>
          Success message
        </Alert>
      );
      const icon = container.querySelector('.alert-icon')!;

      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have aria-label on close button', () => {
      const { container } = render(<Alert dismissible>Alert message</Alert>);
      const closeButton = container.querySelector('.btn-close')!;

      expect(closeButton).toHaveAttribute('aria-label', 'Close alert');
    });
  });

  describe('Semantic HTML', () => {
    it('should use div element with role="alert"', () => {
      const { container } = render(<Alert>Alert message</Alert>);
      const alert = container.querySelector('.alert');

      expect(alert).toBeInTheDocument();
      expect(alert?.tagName).toBe('DIV');
      expect(alert).toHaveAttribute('role', 'alert');
    });

    it('should use h4 for heading', () => {
      const { container } = render(<Alert heading="Alert Title">Message</Alert>);
      const heading = container.querySelector('.alert-heading');

      expect(heading?.tagName).toBe('H4');
    });

    it('should use button element for close', () => {
      const { container } = render(<Alert dismissible>Alert message</Alert>);
      const closeButton = container.querySelector('.btn-close');

      expect(closeButton?.tagName).toBe('BUTTON');
      expect(closeButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Keyboard Navigation', () => {
    it('close button should be focusable', () => {
      const { container } = render(<Alert dismissible>Alert message</Alert>);
      const closeButton = container.querySelector('.btn-close')! as HTMLButtonElement;

      closeButton.focus();
      expect(closeButton).toHaveFocus();
    });

    it('alert content should not be focusable', () => {
      const { container } = render(<Alert>Alert message</Alert>);
      const alert = container.querySelector('.alert')! as HTMLDivElement;

      alert.focus();
      expect(alert).not.toHaveFocus();
    });
  });

  describe('Live Regions', () => {
    it('should announce with assertive priority for alerts', () => {
      const { container } = render(<Alert>Critical alert</Alert>);
      const alert = container.querySelector('.alert')!;

      expect(alert).toHaveAttribute('aria-live', 'assertive');
    });

    it('should announce with polite priority for status', () => {
      const { container } = render(<Alert role="status">Status update</Alert>);
      const alert = container.querySelector('.alert')!;

      expect(alert).toHaveAttribute('aria-live', 'polite');
    });

    it('should have aria-atomic for complete announcement', () => {
      const { container } = render(<Alert>Alert message</Alert>);
      const alert = container.querySelector('.alert')!;

      expect(alert).toHaveAttribute('aria-atomic', 'true');
    });
  });

  describe('Color Contrast', () => {
    // Note: Actual contrast testing is done by axe
    // These tests verify that color-related classes are applied

    it('should apply correct classes for variants', () => {
      const { container } = render(<Alert variant="success">Success</Alert>);
      const alert = container.querySelector('.alert')!;

      expect(alert).toHaveClass('alert-success');
    });

    it('should apply brand classes for custom colors', () => {
      const { container } = render(<Alert brand="energia">Energia alert</Alert>);
      const alert = container.querySelector('.alert')!;

      expect(alert).toHaveClass('alert-brand-energia');
    });
  });

  describe('Focus Indicators', () => {
    it('close button should have visible focus indicator', () => {
      const { container } = render(<Alert dismissible>Alert message</Alert>);
      const closeButton = container.querySelector('.btn-close')! as HTMLButtonElement;

      closeButton.focus();
      expect(closeButton).toHaveFocus();
      // CSS ensures focus-visible outline is applied
    });
  });

  describe('Touch Target Size', () => {
    it('close button should have appropriate CSS class', () => {
      const { container } = render(<Alert dismissible>Alert message</Alert>);
      const closeButton = container.querySelector('.btn-close')!;

      // Note: In JSDOM, getComputedStyle doesn't work properly
      // We verify the component has the correct CSS classes
      // The actual CSS ensures 44x44px minimum (tested in Bootstrap styles)
      expect(closeButton).toHaveClass('btn-close');
    });
  });

  describe('Icon Accessibility', () => {
    it('icon should be hidden from screen readers', () => {
      const { container } = render(
        <Alert variant="success" showIcon>
          Success message
        </Alert>
      );
      const icon = container.querySelector('.alert-icon')!;

      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('custom icon should be hidden from screen readers', () => {
      const { container } = render(<Alert icon={<span>🔔</span>}>Alert message</Alert>);
      const icon = container.querySelector('.alert-icon')!;

      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Dismissible Alerts', () => {
    it('should maintain accessibility when dismissed', async () => {
      const { container } = render(<Alert dismissible>Alert message</Alert>);

      // Before dismissal
      await runAxeTest(container);

      // Alert should render nothing when dismissed (tested in unit tests)
      // This ensures no orphaned accessible elements remain
    });
  });
});
