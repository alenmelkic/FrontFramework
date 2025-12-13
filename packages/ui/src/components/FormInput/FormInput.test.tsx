/**
 * FormInput Component Unit Tests
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@tests/test-utils';
import userEvent from '@testing-library/user-event';
import { FormInput } from './FormInput';

describe('FormInput Component', () => {
  describe('Rendering', () => {
    it('renders without label', () => {
      render(<FormInput placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<FormInput label="Email Address" />);
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    });

    it('renders with required indicator', () => {
      render(<FormInput label="Email" required />);
      const label = screen.getByText('Email');
      expect(label.parentElement).toHaveTextContent('*');
    });

    it('renders with helper text', () => {
      render(<FormInput label="Username" helperText="Choose a unique username" />);
      expect(screen.getByText('Choose a unique username')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<FormInput label="Email" error="Invalid email address" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid email address');
    });

    it('does not show helper text when error is present', () => {
      render(
        <FormInput
          label="Email"
          helperText="Enter your email"
          error="Invalid email"
        />
      );
      expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  describe('Input Types', () => {
    it('renders as text input by default', () => {
      render(<FormInput label="Name" />);
      const input = screen.getByLabelText('Name');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders as email input', () => {
      render(<FormInput label="Email" type="email" />);
      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders as password input', () => {
      render(<FormInput label="Password" type="password" />);
      const input = screen.getByLabelText('Password');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('renders as number input', () => {
      render(<FormInput label="Age" type="number" />);
      const input = screen.getByLabelText('Age');
      expect(input).toHaveAttribute('type', 'number');
    });

    it('renders as tel input', () => {
      render(<FormInput label="Phone" type="tel" />);
      const input = screen.getByLabelText('Phone');
      expect(input).toHaveAttribute('type', 'tel');
    });

    it('renders as url input', () => {
      render(<FormInput label="Website" type="url" />);
      const input = screen.getByLabelText('Website');
      expect(input).toHaveAttribute('type', 'url');
    });

    it('renders as search input', () => {
      render(<FormInput label="Search" type="search" />);
      const input = screen.getByLabelText('Search');
      expect(input).toHaveAttribute('type', 'search');
    });
  });

  describe('Sizes', () => {
    it('renders with default size (md)', () => {
      render(<FormInput label="Name" />);
      const input = screen.getByLabelText('Name');
      expect(input).not.toHaveClass('form-control-sm');
      expect(input).not.toHaveClass('form-control-lg');
    });

    it('renders with small size', () => {
      render(<FormInput label="Name" size="sm" />);
      const input = screen.getByLabelText('Name');
      expect(input).toHaveClass('form-control-sm');
    });

    it('renders with large size', () => {
      render(<FormInput label="Name" size="lg" />);
      const input = screen.getByLabelText('Name');
      expect(input).toHaveClass('form-control-lg');
    });
  });

  describe('Brand Theming', () => {
    it('renders without brand class by default', () => {
      render(<FormInput label="Name" />);
      const input = screen.getByLabelText('Name');
      expect(input).not.toHaveClass('form-input-brand-energia');
      expect(input).not.toHaveClass('form-input-brand-powerni');
    });

    it('renders with Energia brand', () => {
      render(<FormInput label="Name" brand="energia" />);
      const input = screen.getByLabelText('Name');
      expect(input).toHaveClass('form-input-brand-energia');
    });

    it('renders with PowerNI brand', () => {
      render(<FormInput label="Name" brand="powerni" />);
      const input = screen.getByLabelText('Name');
      expect(input).toHaveClass('form-input-brand-powerni');
    });
  });

  describe('States', () => {
    it('renders as enabled by default', () => {
      render(<FormInput label="Name" />);
      const input = screen.getByLabelText('Name');
      expect(input).not.toBeDisabled();
    });

    it('renders as disabled when disabled prop is true', () => {
      render(<FormInput label="Name" disabled />);
      const input = screen.getByLabelText('Name');
      expect(input).toBeDisabled();
    });

    it('applies error styling when error is present', () => {
      render(<FormInput label="Email" error="Invalid email" />);
      const input = screen.getByLabelText('Email');
      expect(input).toHaveClass('is-invalid');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('applies required attribute', () => {
      render(<FormInput label="Email" required />);
      const input = screen.getByLabelText(/email/i);
      expect(input).toBeRequired();
      expect(input).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Interactions', () => {
    it('calls onChange when input value changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<FormInput label="Name" onChange={handleChange} />);
      const input = screen.getByLabelText('Name');

      await user.type(input, 'John');
      expect(handleChange).toHaveBeenCalledTimes(4); // Once per character
    });

    it('updates value when controlled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      const { rerender } = render(
        <FormInput label="Name" value="" onChange={handleChange} />
      );
      const input = screen.getByLabelText('Name') as HTMLInputElement;

      expect(input.value).toBe('');

      await user.type(input, 'J');

      rerender(<FormInput label="Name" value="J" onChange={handleChange} />);
      expect(input.value).toBe('J');
    });

    it('does not call onChange when disabled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<FormInput label="Name" onChange={handleChange} disabled />);
      const input = screen.getByLabelText('Name');

      await user.type(input, 'John');
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('associates label with input via id', () => {
      render(<FormInput label="Email" id="email-input" />);
      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('id', 'email-input');
    });

    it('generates unique id when not provided', () => {
      const { container } = render(<FormInput label="Email" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('id');
      expect(input?.id).toBeTruthy();
    });

    it('links error message via aria-describedby', () => {
      render(<FormInput label="Email" error="Invalid email" id="email" />);
      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('aria-describedby', 'email-error');
    });

    it('links helper text via aria-describedby', () => {
      render(<FormInput label="Email" helperText="Enter your email" id="email" />);
      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('aria-describedby', 'email-helper');
    });

    it('uses custom aria-label when provided', () => {
      render(<FormInput aria-label="Search query" placeholder="Search..." />);
      const input = screen.getByLabelText('Search query');
      expect(input).toBeInTheDocument();
    });

    it('falls back to placeholder as aria-label when no label', () => {
      render(<FormInput placeholder="Search..." />);
      const input = screen.getByPlaceholderText('Search...');
      expect(input).toHaveAttribute('aria-label', 'Search...');
    });
  });

  describe('Custom Props', () => {
    it('applies custom className to input', () => {
      render(<FormInput label="Name" className="custom-input" />);
      const input = screen.getByLabelText('Name');
      expect(input).toHaveClass('custom-input');
      expect(input).toHaveClass('form-control'); // Should still have base class
    });

    it('applies custom containerClassName', () => {
      const { container } = render(
        <FormInput label="Name" containerClassName="custom-container" />
      );
      const containerDiv = container.querySelector('.form-input-container');
      expect(containerDiv).toHaveClass('custom-container');
    });

    it('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<FormInput label="Name" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('passes through additional HTML attributes', () => {
      render(
        <FormInput
          label="Name"
          data-testid="test-input"
          maxLength={10}
          autoComplete="name"
        />
      );
      const input = screen.getByTestId('test-input');
      expect(input).toHaveAttribute('maxLength', '10');
      expect(input).toHaveAttribute('autoComplete', 'name');
    });

    it('applies name attribute', () => {
      render(<FormInput label="Email" name="user_email" />);
      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('name', 'user_email');
    });
  });

  describe('Placeholder', () => {
    it('renders with placeholder', () => {
      render(<FormInput label="Name" placeholder="Enter your name" />);
      const input = screen.getByPlaceholderText('Enter your name');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Value Control', () => {
    it('renders with initial value', () => {
      render(<FormInput label="Name" value="John Doe" onChange={() => {}} />);
      const input = screen.getByLabelText('Name') as HTMLInputElement;
      expect(input.value).toBe('John Doe');
    });

    it('renders with number value', () => {
      render(<FormInput label="Age" type="number" value={25} onChange={() => {}} />);
      const input = screen.getByLabelText('Age') as HTMLInputElement;
      expect(input.value).toBe('25');
    });
  });
});
