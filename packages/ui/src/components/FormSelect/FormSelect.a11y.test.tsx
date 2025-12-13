/**
 * FormSelect Component Accessibility Tests
 * Tests WCAG 2.1 AA compliance
 */

import { describe, it, expect } from 'vitest';
import { render } from '@tests/test-utils';
import { runAxeTest, testKeyboardNavigation, verifyAriaAttributes } from '@tests/a11y-utils';
import { FormSelect } from './FormSelect';
import { FormSelectOption } from './FormSelect.types';

const mockOptions: FormSelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('FormSelect Accessibility', () => {
  describe('Axe Violations', () => {
    it('should have no accessibility violations (default)', async () => {
      const { container } = render(<FormSelect label="Country" options={mockOptions} />);
      await runAxeTest(container);
    });

    it('should have no accessibility violations (with helper text)', async () => {
      const { container } = render(
        <FormSelect
          label="Country"
          options={mockOptions}
          helperText="Select your country"
        />
      );
      await runAxeTest(container);
    });

    it('should have no accessibility violations (with error)', async () => {
      const { container } = render(
        <FormSelect
          label="Country"
          options={mockOptions}
          error="Please select a country"
        />
      );
      await runAxeTest(container);
    });

    it('should have no accessibility violations (required)', async () => {
      const { container } = render(
        <FormSelect label="Country" options={mockOptions} required />
      );
      await runAxeTest(container);
    });

    it('should have no accessibility violations (disabled)', async () => {
      const { container } = render(
        <FormSelect label="Country" options={mockOptions} disabled />
      );
      await runAxeTest(container);
    });

    it('should have no accessibility violations (with placeholder)', async () => {
      const { container } = render(
        <FormSelect
          label="Country"
          options={mockOptions}
          placeholder="Select a country"
        />
      );
      await runAxeTest(container);
    });

    it('should have no accessibility violations (all sizes)', async () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      for (const size of sizes) {
        const { container } = render(
          <FormSelect label="Country" options={mockOptions} size={size} />
        );
        await runAxeTest(container);
      }
    });

    it('should have no accessibility violations (both brands)', async () => {
      const { container: energiaContainer } = render(
        <FormSelect label="Country" options={mockOptions} brand="energia" />
      );
      await runAxeTest(energiaContainer);

      const { container: powerniContainer } = render(
        <FormSelect label="Country" options={mockOptions} brand="powerni" />
      );
      await runAxeTest(powerniContainer);
    });

    it('should have no accessibility violations (without label but with aria-label)', async () => {
      const { container } = render(
        <FormSelect aria-label="Country selector" options={mockOptions} />
      );
      await runAxeTest(container);
    });

    it('should have no accessibility violations (disabled options)', async () => {
      const optionsWithDisabled = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true },
        { value: 'option3', label: 'Option 3' },
      ];

      const { container } = render(
        <FormSelect label="Country" options={optionsWithDisabled} />
      );
      await runAxeTest(container);
    });
  });

  describe('ARIA Attributes', () => {
    it('should have proper ARIA attributes when required', () => {
      const { container } = render(
        <FormSelect label="Country" options={mockOptions} required />
      );
      const select = container.querySelector('select')!;

      verifyAriaAttributes(select, {
        'aria-required': 'true',
      });
      expect(select).toBeRequired();
    });

    it('should have proper ARIA attributes when error is present', () => {
      const { container } = render(
        <FormSelect
          label="Country"
          options={mockOptions}
          error="Invalid selection"
          id="country"
        />
      );
      const select = container.querySelector('select')!;

      verifyAriaAttributes(select, {
        'aria-invalid': 'true',
        'aria-describedby': 'country-error',
      });
    });

    it('should have proper ARIA attributes with helper text', () => {
      const { container } = render(
        <FormSelect
          label="Country"
          options={mockOptions}
          helperText="Select your country"
          id="country"
        />
      );
      const select = container.querySelector('select')!;

      verifyAriaAttributes(select, {
        'aria-describedby': 'country-helper',
      });
    });

    it('should support custom aria-label', () => {
      const { container } = render(
        <FormSelect aria-label="Country selector" options={mockOptions} />
      );
      const select = container.querySelector('select')!;

      verifyAriaAttributes(select, {
        'aria-label': 'Country selector',
      });
    });

    it('should provide default aria-label when no label', () => {
      const { container } = render(<FormSelect options={mockOptions} />);
      const select = container.querySelector('select')!;

      verifyAriaAttributes(select, {
        'aria-label': 'Select an option',
      });
    });

    it('should not have aria-invalid when no error', () => {
      const { container } = render(<FormSelect label="Country" options={mockOptions} />);
      const select = container.querySelector('select')!;

      expect(select).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('Label Association', () => {
    it('should properly associate label with select', () => {
      const { container } = render(
        <FormSelect label="Country" options={mockOptions} id="country" />
      );
      const label = container.querySelector('label')!;
      const select = container.querySelector('select')!;

      expect(label).toHaveAttribute('for', 'country');
      expect(select).toHaveAttribute('id', 'country');
    });

    it('should generate unique IDs when not provided', () => {
      const { container } = render(<FormSelect label="Country" options={mockOptions} />);
      const label = container.querySelector('label')!;
      const select = container.querySelector('select')!;

      const selectId = select.getAttribute('id');
      expect(selectId).toBeTruthy();
      expect(label).toHaveAttribute('for', selectId!);
    });
  });

  describe('Error Message Accessibility', () => {
    it('should have role="alert" on error message', () => {
      const { container } = render(
        <FormSelect label="Country" options={mockOptions} error="Invalid selection" />
      );
      const errorMessage = container.querySelector('.invalid-feedback')!;

      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    it('should link error message to select via aria-describedby', () => {
      const { container } = render(
        <FormSelect
          label="Country"
          options={mockOptions}
          error="Invalid selection"
          id="country"
        />
      );
      const select = container.querySelector('select')!;
      const errorMessage = container.querySelector('.invalid-feedback')!;

      expect(select).toHaveAttribute('aria-describedby', 'country-error');
      expect(errorMessage).toHaveAttribute('id', 'country-error');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable via keyboard', async () => {
      const { container } = render(<FormSelect label="Country" options={mockOptions} />);
      const select = container.querySelector('select')!;

      await testKeyboardNavigation(select);
    });

    it('should not be focusable when disabled', () => {
      const { container } = render(
        <FormSelect label="Country" options={mockOptions} disabled />
      );
      const select = container.querySelector('select')!;

      expect(select).toBeDisabled();
      select.focus();
      expect(document.activeElement).not.toBe(select);
    });
  });

  describe('Semantic HTML', () => {
    it('should use select element', () => {
      const { container } = render(<FormSelect label="Country" options={mockOptions} />);
      const select = container.querySelector('select');
      expect(select).toBeInTheDocument();
    });

    it('should use label element', () => {
      const { container } = render(<FormSelect label="Country" options={mockOptions} />);
      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
    });

    it('should use option elements', () => {
      const { container } = render(<FormSelect label="Country" options={mockOptions} />);
      const options = container.querySelectorAll('option');
      expect(options.length).toBeGreaterThan(0);
    });
  });

  describe('Required Field Indication', () => {
    it('should visually indicate required fields', () => {
      const { container } = render(
        <FormSelect label="Country" options={mockOptions} required />
      );
      const requiredIndicator = container.querySelector('.text-danger');
      expect(requiredIndicator).toBeInTheDocument();
      expect(requiredIndicator).toHaveTextContent('*');
    });

    it('should have aria-label on required indicator', () => {
      const { container } = render(
        <FormSelect label="Country" options={mockOptions} required />
      );
      const requiredIndicator = container.querySelector('.text-danger')!;
      expect(requiredIndicator).toHaveAttribute('aria-label', 'required');
    });
  });

  describe('Touch Target Size', () => {
    it('should have appropriate CSS class for touch targets', () => {
      const { container } = render(<FormSelect label="Country" options={mockOptions} />);
      const select = container.querySelector('select')!;

      // Note: In JSDOM, getComputedStyle doesn't work properly
      // We verify the component has the correct CSS classes
      // The actual CSS ensures 44px minimum height (tested in Bootstrap styles)
      expect(select).toHaveClass('form-select');
    });

    it('should have small size class for small selects', () => {
      const { container } = render(
        <FormSelect label="Country" options={mockOptions} size="sm" />
      );
      const select = container.querySelector('select')!;

      // Small selects have form-select-sm class which sets min 38px height
      expect(select).toHaveClass('form-select-sm');
    });
  });

  describe('Focus Indicators', () => {
    it('should be focusable', () => {
      const { container } = render(<FormSelect label="Country" options={mockOptions} />);
      const select = container.querySelector('select')!;

      select.focus();
      expect(select).toHaveFocus();
    });
  });

  describe('Helper Text Accessibility', () => {
    it('should link helper text to select', () => {
      const { container } = render(
        <FormSelect
          label="Country"
          options={mockOptions}
          helperText="Select your country"
          id="country"
        />
      );
      const select = container.querySelector('select')!;
      const helperText = container.querySelector('.form-text')!;

      expect(select).toHaveAttribute('aria-describedby', 'country-helper');
      expect(helperText).toHaveAttribute('id', 'country-helper');
    });

    it('should not show helper text when error is present', () => {
      const { container } = render(
        <FormSelect
          label="Country"
          options={mockOptions}
          helperText="Select your country"
          error="Invalid selection"
        />
      );
      const helperText = container.querySelector('.form-text');
      expect(helperText).not.toBeInTheDocument();
    });
  });

  describe('Multiple ARIA Descriptions', () => {
    it('should combine error and custom aria-describedby', () => {
      const { container } = render(
        <FormSelect
          label="Country"
          options={mockOptions}
          error="Invalid selection"
          id="country"
          aria-describedby="custom-description"
        />
      );
      const select = container.querySelector('select')!;

      const describedBy = select.getAttribute('aria-describedby');
      expect(describedBy).toContain('country-error');
      expect(describedBy).toContain('custom-description');
    });

    it('should combine helper text and custom aria-describedby', () => {
      const { container } = render(
        <FormSelect
          label="Country"
          options={mockOptions}
          helperText="Select your country"
          id="country"
          aria-describedby="custom-description"
        />
      );
      const select = container.querySelector('select')!;

      const describedBy = select.getAttribute('aria-describedby');
      expect(describedBy).toContain('country-helper');
      expect(describedBy).toContain('custom-description');
    });
  });

  describe('Disabled Options Accessibility', () => {
    it('should properly mark disabled options', () => {
      const optionsWithDisabled = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true },
        { value: 'option3', label: 'Option 3' },
      ];

      const { container } = render(
        <FormSelect label="Country" options={optionsWithDisabled} />
      );
      const option2 = container.querySelector('option[value="option2"]')!;

      expect(option2).toHaveAttribute('disabled');
    });
  });
});
