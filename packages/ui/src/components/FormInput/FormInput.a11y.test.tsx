/**
 * FormInput Component Accessibility Tests
 * Tests WCAG 2.1 AA compliance
 */

import { describe, it, expect } from 'vitest';
import { render } from '@tests/test-utils';
import { runAxeTest, testKeyboardNavigation, verifyAriaAttributes } from '@tests/a11y-utils';
import { FormInput } from './FormInput';

describe('FormInput Accessibility', () => {
  describe('Axe Violations', () => {
    it('should have no accessibility violations (default)', async () => {
      const { container } = render(<FormInput label="Email" />);
      await runAxeTest(container);
    });

    it('should have no accessibility violations (with helper text)', async () => {
      const { container } = render(
        <FormInput label="Email" helperText="Enter your email address" />
      );
      await runAxeTest(container);
    });

    it('should have no accessibility violations (with error)', async () => {
      const { container } = render(
        <FormInput label="Email" error="Invalid email address" />
      );
      await runAxeTest(container);
    });

    it('should have no accessibility violations (required)', async () => {
      const { container } = render(<FormInput label="Email" required />);
      await runAxeTest(container);
    });

    it('should have no accessibility violations (disabled)', async () => {
      const { container } = render(<FormInput label="Email" disabled />);
      await runAxeTest(container);
    });

    it('should have no accessibility violations (all input types)', async () => {
      const types = ['text', 'email', 'password', 'tel', 'url', 'number', 'search'] as const;

      for (const type of types) {
        const { container } = render(<FormInput label={type} type={type} />);
        await runAxeTest(container);
      }
    });

    it('should have no accessibility violations (all sizes)', async () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      for (const size of sizes) {
        const { container } = render(<FormInput label="Name" size={size} />);
        await runAxeTest(container);
      }
    });

    it('should have no accessibility violations (both brands)', async () => {
      const { container: energiaContainer } = render(
        <FormInput label="Email" brand="energia" />
      );
      await runAxeTest(energiaContainer);

      const { container: powerniContainer } = render(
        <FormInput label="Email" brand="powerni" />
      );
      await runAxeTest(powerniContainer);
    });

    it('should have no accessibility violations (without label but with aria-label)', async () => {
      const { container } = render(<FormInput aria-label="Search query" placeholder="Search..." />);
      await runAxeTest(container);
    });
  });

  describe('ARIA Attributes', () => {
    it('should have proper ARIA attributes when required', () => {
      const { container } = render(<FormInput label="Email" required />);
      const input = container.querySelector('input')!;

      verifyAriaAttributes(input, {
        'aria-required': 'true',
      });
      expect(input).toBeRequired();
    });

    it('should have proper ARIA attributes when error is present', () => {
      const { container } = render(
        <FormInput label="Email" error="Invalid email" id="email" />
      );
      const input = container.querySelector('input')!;

      verifyAriaAttributes(input, {
        'aria-invalid': 'true',
        'aria-describedby': 'email-error',
      });
    });

    it('should have proper ARIA attributes with helper text', () => {
      const { container } = render(
        <FormInput label="Email" helperText="Enter your email" id="email" />
      );
      const input = container.querySelector('input')!;

      verifyAriaAttributes(input, {
        'aria-describedby': 'email-helper',
      });
    });

    it('should support custom aria-label', () => {
      const { container } = render(
        <FormInput aria-label="Search query" placeholder="Search..." />
      );
      const input = container.querySelector('input')!;

      verifyAriaAttributes(input, {
        'aria-label': 'Search query',
      });
    });

    it('should use placeholder as aria-label when no label provided', () => {
      const { container } = render(<FormInput placeholder="Enter your name" />);
      const input = container.querySelector('input')!;

      verifyAriaAttributes(input, {
        'aria-label': 'Enter your name',
      });
    });

    it('should not have aria-invalid when no error', () => {
      const { container } = render(<FormInput label="Email" />);
      const input = container.querySelector('input')!;

      expect(input).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('Label Association', () => {
    it('should properly associate label with input', () => {
      const { container } = render(<FormInput label="Email Address" id="email" />);
      const label = container.querySelector('label')!;
      const input = container.querySelector('input')!;

      expect(label).toHaveAttribute('for', 'email');
      expect(input).toHaveAttribute('id', 'email');
    });

    it('should generate unique IDs when not provided', () => {
      const { container } = render(<FormInput label="Email" />);
      const label = container.querySelector('label')!;
      const input = container.querySelector('input')!;

      const inputId = input.getAttribute('id');
      expect(inputId).toBeTruthy();
      expect(label).toHaveAttribute('for', inputId!);
    });
  });

  describe('Error Message Accessibility', () => {
    it('should have role="alert" on error message', () => {
      const { container } = render(<FormInput label="Email" error="Invalid email" />);
      const errorMessage = container.querySelector('.invalid-feedback')!;

      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    it('should link error message to input via aria-describedby', () => {
      const { container } = render(
        <FormInput label="Email" error="Invalid email" id="email" />
      );
      const input = container.querySelector('input')!;
      const errorMessage = container.querySelector('.invalid-feedback')!;

      expect(input).toHaveAttribute('aria-describedby', 'email-error');
      expect(errorMessage).toHaveAttribute('id', 'email-error');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable via keyboard', async () => {
      const { container } = render(<FormInput label="Email" />);
      const input = container.querySelector('input')!;

      await testKeyboardNavigation(input);
    });

    it('should not be focusable when disabled', () => {
      const { container } = render(<FormInput label="Email" disabled />);
      const input = container.querySelector('input')!;

      expect(input).toBeDisabled();
      input.focus();
      expect(document.activeElement).not.toBe(input);
    });
  });

  describe('Semantic HTML', () => {
    it('should use input element', () => {
      const { container } = render(<FormInput label="Email" />);
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
    });

    it('should use label element', () => {
      const { container } = render(<FormInput label="Email" />);
      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
    });

    it('should use proper input type', () => {
      const { container } = render(<FormInput label="Email" type="email" />);
      const input = container.querySelector('input')!;
      expect(input).toHaveAttribute('type', 'email');
    });
  });

  describe('Required Field Indication', () => {
    it('should visually indicate required fields', () => {
      const { container } = render(<FormInput label="Email" required />);
      const requiredIndicator = container.querySelector('.text-danger');
      expect(requiredIndicator).toBeInTheDocument();
      expect(requiredIndicator).toHaveTextContent('*');
    });

    it('should have aria-label on required indicator', () => {
      const { container } = render(<FormInput label="Email" required />);
      const requiredIndicator = container.querySelector('.text-danger')!;
      expect(requiredIndicator).toHaveAttribute('aria-label', 'required');
    });
  });

  describe('Touch Target Size', () => {
    it('should have appropriate CSS class for touch targets', () => {
      const { container } = render(<FormInput label="Email" />);
      const input = container.querySelector('input')!;

      // Note: In JSDOM, getComputedStyle doesn't work properly
      // We verify the component has the correct CSS classes
      // The actual CSS ensures 44px minimum height (tested in Bootstrap styles)
      expect(input).toHaveClass('form-control');
    });

    it('should have small size class for small inputs', () => {
      const { container } = render(<FormInput label="Email" size="sm" />);
      const input = container.querySelector('input')!;

      // Small inputs have form-control-sm class which sets min 38px height
      expect(input).toHaveClass('form-control-sm');
    });
  });

  describe('Focus Indicators', () => {
    it('should be focusable', () => {
      const { container } = render(<FormInput label="Email" />);
      const input = container.querySelector('input')!;

      input.focus();
      expect(input).toHaveFocus();
    });
  });

  describe('Helper Text Accessibility', () => {
    it('should link helper text to input', () => {
      const { container } = render(
        <FormInput label="Email" helperText="We'll never share your email" id="email" />
      );
      const input = container.querySelector('input')!;
      const helperText = container.querySelector('.form-text')!;

      expect(input).toHaveAttribute('aria-describedby', 'email-helper');
      expect(helperText).toHaveAttribute('id', 'email-helper');
    });

    it('should not show helper text when error is present', () => {
      const { container } = render(
        <FormInput
          label="Email"
          helperText="We'll never share your email"
          error="Invalid email"
        />
      );
      const helperText = container.querySelector('.form-text');
      expect(helperText).not.toBeInTheDocument();
    });
  });

  describe('Multiple ARIA Descriptions', () => {
    it('should combine error and custom aria-describedby', () => {
      const { container } = render(
        <FormInput
          label="Email"
          error="Invalid email"
          id="email"
          aria-describedby="custom-description"
        />
      );
      const input = container.querySelector('input')!;

      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toContain('email-error');
      expect(describedBy).toContain('custom-description');
    });

    it('should combine helper text and custom aria-describedby', () => {
      const { container } = render(
        <FormInput
          label="Email"
          helperText="Enter your email"
          id="email"
          aria-describedby="custom-description"
        />
      );
      const input = container.querySelector('input')!;

      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toContain('email-helper');
      expect(describedBy).toContain('custom-description');
    });
  });
});
