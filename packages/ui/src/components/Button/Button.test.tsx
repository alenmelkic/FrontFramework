/**
 * Button Component Unit Tests
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@tests/test-utils';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with children', () => {
      render(<Button>Click Me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders with default variant (primary)', () => {
      render(<Button>Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-primary');
    });

    it('renders with custom variant', () => {
      render(<Button variant="secondary">Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-secondary');
    });

    it('renders with all Bootstrap variants', () => {
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
      ] as const;

      variants.forEach(variant => {
        const { unmount } = render(<Button variant={variant}>{variant}</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(`btn-${variant}`);
        unmount();
      });
    });

    it('renders with outline variants', () => {
      render(<Button variant="outline-primary">Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-outline-primary');
    });
  });

  describe('Sizes', () => {
    it('renders with default size (md)', () => {
      render(<Button>Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('btn-sm');
      expect(button).not.toHaveClass('btn-lg');
    });

    it('renders with small size', () => {
      render(<Button size="sm">Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-sm');
    });

    it('renders with large size', () => {
      render(<Button size="lg">Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-lg');
    });
  });

  describe('Brand Theming', () => {
    it('renders without brand class by default', () => {
      render(<Button>Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('btn-brand-energia');
      expect(button).not.toHaveClass('btn-brand-powerni');
    });

    it('renders with Energia brand', () => {
      render(<Button brand="energia">Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-brand-energia');
    });

    it('renders with PowerNI brand', () => {
      render(<Button brand="powerni">Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-brand-powerni');
    });
  });

  describe('States', () => {
    it('renders as enabled by default', () => {
      render(<Button>Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
      expect(button).not.toHaveAttribute('aria-disabled');
    });

    it('renders as disabled when disabled prop is true', () => {
      render(<Button disabled>Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders loading state with spinner', () => {
      const { container } = render(<Button loading>Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-loading');
      expect(button).toHaveAttribute('aria-busy', 'true');

      // Spinner has role="status" but is hidden with aria-hidden
      // Check it exists in the DOM instead
      const spinner = container.querySelector('.btn-spinner');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('role', 'status');
    });

    it('disables button when loading', () => {
      render(<Button loading>Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click Me</Button>);
      const button = screen.getByRole('button');

      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} disabled>
          Click Me
        </Button>
      );
      const button = screen.getByRole('button');

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} loading>
          Click Me
        </Button>
      );
      const button = screen.getByRole('button');

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('supports keyboard interaction (Enter)', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click Me</Button>);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('supports keyboard interaction (Space)', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click Me</Button>);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Button Types', () => {
    it('renders as type="button" by default', () => {
      render(<Button>Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('renders as type="submit" when specified', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('renders as type="reset" when specified', () => {
      render(<Button type="reset">Reset</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });
  });

  describe('Full Width', () => {
    it('does not have full width class by default', () => {
      render(<Button>Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('w-100');
    });

    it('adds full width class when fullWidth is true', () => {
      render(<Button fullWidth>Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-100');
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      render(<Button className="custom-class">Click Me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('btn'); // Should still have base class
    });

    it('applies aria-label', () => {
      render(<Button aria-label="Custom Label">Click Me</Button>);
      const button = screen.getByRole('button', { name: /custom label/i });
      expect(button).toBeInTheDocument();
    });

    it('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Click Me</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('passes through additional HTML attributes', () => {
      render(
        <Button data-testid="test-button" id="my-button">
          Click Me
        </Button>
      );
      const button = screen.getByTestId('test-button');
      expect(button).toHaveAttribute('id', 'my-button');
    });
  });
});
