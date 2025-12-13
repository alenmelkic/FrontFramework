/**
 * FormSelect Component Unit Tests
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@tests/test-utils';
import userEvent from '@testing-library/user-event';
import { FormSelect } from './FormSelect';
import { FormSelectOption } from './FormSelect.types';

const mockOptions: FormSelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('FormSelect Component', () => {
  describe('Rendering', () => {
    it('renders without label', () => {
      render(<FormSelect options={mockOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<FormSelect label="Country" options={mockOptions} />);
      expect(screen.getByLabelText('Country')).toBeInTheDocument();
    });

    it('renders with required indicator', () => {
      render(<FormSelect label="Country" options={mockOptions} required />);
      const label = screen.getByText('Country');
      expect(label.parentElement).toHaveTextContent('*');
    });

    it('renders with helper text', () => {
      render(
        <FormSelect
          label="Country"
          options={mockOptions}
          helperText="Select your country"
        />
      );
      expect(screen.getByText('Select your country')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(
        <FormSelect label="Country" options={mockOptions} error="Please select a country" />
      );
      expect(screen.getByRole('alert')).toHaveTextContent('Please select a country');
    });

    it('does not show helper text when error is present', () => {
      render(
        <FormSelect
          label="Country"
          options={mockOptions}
          helperText="Select your country"
          error="Invalid selection"
        />
      );
      expect(screen.queryByText('Select your country')).not.toBeInTheDocument();
      expect(screen.getByText('Invalid selection')).toBeInTheDocument();
    });

    it('renders all options', () => {
      const { container } = render(<FormSelect label="Country" options={mockOptions} />);
      const options = container.querySelectorAll('option');
      expect(options).toHaveLength(3);
    });

    it('renders with placeholder', () => {
      render(
        <FormSelect
          label="Country"
          options={mockOptions}
          placeholder="Select a country"
        />
      );
      const select = screen.getByLabelText('Country');
      const firstOption = select.querySelector('option:first-child');
      expect(firstOption).toHaveTextContent('Select a country');
      expect(firstOption).toHaveAttribute('disabled');
    });
  });

  describe('Sizes', () => {
    it('renders with default size (md)', () => {
      render(<FormSelect label="Country" options={mockOptions} />);
      const select = screen.getByLabelText('Country');
      expect(select).not.toHaveClass('form-select-sm');
      expect(select).not.toHaveClass('form-select-lg');
    });

    it('renders with small size', () => {
      render(<FormSelect label="Country" options={mockOptions} size="sm" />);
      const select = screen.getByLabelText('Country');
      expect(select).toHaveClass('form-select-sm');
    });

    it('renders with large size', () => {
      render(<FormSelect label="Country" options={mockOptions} size="lg" />);
      const select = screen.getByLabelText('Country');
      expect(select).toHaveClass('form-select-lg');
    });
  });

  describe('Brand Theming', () => {
    it('renders without brand class by default', () => {
      render(<FormSelect label="Country" options={mockOptions} />);
      const select = screen.getByLabelText('Country');
      expect(select).not.toHaveClass('form-select-brand-energia');
      expect(select).not.toHaveClass('form-select-brand-powerni');
    });

    it('renders with Energia brand', () => {
      render(<FormSelect label="Country" options={mockOptions} brand="energia" />);
      const select = screen.getByLabelText('Country');
      expect(select).toHaveClass('form-select-brand-energia');
    });

    it('renders with PowerNI brand', () => {
      render(<FormSelect label="Country" options={mockOptions} brand="powerni" />);
      const select = screen.getByLabelText('Country');
      expect(select).toHaveClass('form-select-brand-powerni');
    });
  });

  describe('States', () => {
    it('renders as enabled by default', () => {
      render(<FormSelect label="Country" options={mockOptions} />);
      const select = screen.getByLabelText('Country');
      expect(select).not.toBeDisabled();
    });

    it('renders as disabled when disabled prop is true', () => {
      render(<FormSelect label="Country" options={mockOptions} disabled />);
      const select = screen.getByLabelText('Country');
      expect(select).toBeDisabled();
    });

    it('applies error styling when error is present', () => {
      render(
        <FormSelect label="Country" options={mockOptions} error="Invalid selection" />
      );
      const select = screen.getByLabelText('Country');
      expect(select).toHaveClass('is-invalid');
      expect(select).toHaveAttribute('aria-invalid', 'true');
    });

    it('applies required attribute', () => {
      render(<FormSelect label="Country" options={mockOptions} required />);
      const select = screen.getByLabelText(/country/i);
      expect(select).toBeRequired();
      expect(select).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Options', () => {
    it('renders disabled options', () => {
      const optionsWithDisabled = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true },
        { value: 'option3', label: 'Option 3' },
      ];

      const { container } = render(
        <FormSelect label="Select" options={optionsWithDisabled} />
      );
      const option2 = container.querySelector('option[value="option2"]');
      expect(option2).toHaveAttribute('disabled');
    });

    it('renders options with numeric values', () => {
      const numericOptions = [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
        { value: 3, label: 'Three' },
      ];

      const { container } = render(<FormSelect label="Number" options={numericOptions} />);
      const option1 = container.querySelector('option[value="1"]');
      expect(option1).toBeInTheDocument();
      expect(option1).toHaveTextContent('One');
    });
  });

  describe('Interactions', () => {
    it('calls onChange when selection changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FormSelect label="Country" options={mockOptions} onChange={handleChange} />
      );
      const select = screen.getByLabelText('Country');

      await user.selectOptions(select, 'option2');
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('updates value when controlled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      const { rerender } = render(
        <FormSelect label="Country" options={mockOptions} value="" onChange={handleChange} />
      );
      const select = screen.getByLabelText('Country') as HTMLSelectElement;

      expect(select.value).toBe('');

      await user.selectOptions(select, 'option1');

      rerender(
        <FormSelect
          label="Country"
          options={mockOptions}
          value="option1"
          onChange={handleChange}
        />
      );
      expect(select.value).toBe('option1');
    });

    it('does not call onChange when disabled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FormSelect
          label="Country"
          options={mockOptions}
          onChange={handleChange}
          disabled
        />
      );
      const select = screen.getByLabelText('Country');

      await user.selectOptions(select, 'option2');
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('associates label with select via id', () => {
      render(<FormSelect label="Country" options={mockOptions} id="country-select" />);
      const select = screen.getByLabelText('Country');
      expect(select).toHaveAttribute('id', 'country-select');
    });

    it('generates unique id when not provided', () => {
      const { container } = render(<FormSelect label="Country" options={mockOptions} />);
      const select = container.querySelector('select');
      expect(select).toHaveAttribute('id');
      expect(select?.id).toBeTruthy();
    });

    it('links error message via aria-describedby', () => {
      render(
        <FormSelect
          label="Country"
          options={mockOptions}
          error="Invalid selection"
          id="country"
        />
      );
      const select = screen.getByLabelText('Country');
      expect(select).toHaveAttribute('aria-describedby', 'country-error');
    });

    it('links helper text via aria-describedby', () => {
      render(
        <FormSelect
          label="Country"
          options={mockOptions}
          helperText="Select your country"
          id="country"
        />
      );
      const select = screen.getByLabelText('Country');
      expect(select).toHaveAttribute('aria-describedby', 'country-helper');
    });

    it('uses custom aria-label when provided', () => {
      render(<FormSelect aria-label="Country selector" options={mockOptions} />);
      const select = screen.getByLabelText('Country selector');
      expect(select).toBeInTheDocument();
    });

    it('provides default aria-label when no label', () => {
      render(<FormSelect options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-label', 'Select an option');
    });
  });

  describe('Custom Props', () => {
    it('applies custom className to select', () => {
      render(
        <FormSelect label="Country" options={mockOptions} className="custom-select" />
      );
      const select = screen.getByLabelText('Country');
      expect(select).toHaveClass('custom-select');
      expect(select).toHaveClass('form-select'); // Should still have base class
    });

    it('applies custom containerClassName', () => {
      const { container } = render(
        <FormSelect
          label="Country"
          options={mockOptions}
          containerClassName="custom-container"
        />
      );
      const containerDiv = container.querySelector('.form-select-container');
      expect(containerDiv).toHaveClass('custom-container');
    });

    it('forwards ref to select element', () => {
      const ref = React.createRef<HTMLSelectElement>();
      render(<FormSelect label="Country" options={mockOptions} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    });

    it('passes through additional HTML attributes', () => {
      render(
        <FormSelect
          label="Country"
          options={mockOptions}
          data-testid="test-select"
          autoFocus
        />
      );
      const select = screen.getByTestId('test-select');
      expect(select).toHaveAttribute('autoFocus');
    });

    it('applies name attribute', () => {
      render(<FormSelect label="Country" options={mockOptions} name="user_country" />);
      const select = screen.getByLabelText('Country');
      expect(select).toHaveAttribute('name', 'user_country');
    });
  });

  describe('Value Control', () => {
    it('renders with initial value', () => {
      render(
        <FormSelect
          label="Country"
          options={mockOptions}
          value="option2"
          onChange={() => {}}
        />
      );
      const select = screen.getByLabelText('Country') as HTMLSelectElement;
      expect(select.value).toBe('option2');
    });

    it('renders with numeric value', () => {
      const numericOptions = [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
      ];

      render(
        <FormSelect label="Number" options={numericOptions} value={2} onChange={() => {}} />
      );
      const select = screen.getByLabelText('Number') as HTMLSelectElement;
      expect(select.value).toBe('2');
    });
  });
});
