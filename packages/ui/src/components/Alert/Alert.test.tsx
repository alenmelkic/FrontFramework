/**
 * Alert Component Unit Tests
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@tests/test-utils';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert Component', () => {
  describe('Rendering', () => {
    it('renders with children', () => {
      render(<Alert>This is an alert message</Alert>);
      expect(screen.getByText('This is an alert message')).toBeInTheDocument();
    });

    it('renders with default variant (info)', () => {
      const { container } = render(<Alert>Info alert</Alert>);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveClass('alert-info');
    });

    it('renders with custom variant', () => {
      const { container } = render(<Alert variant="success">Success alert</Alert>);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveClass('alert-success');
    });

    it('renders all Bootstrap variants', () => {
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

      variants.forEach((variant) => {
        const { container, unmount } = render(<Alert variant={variant}>{variant}</Alert>);
        const alert = container.querySelector('.alert');
        expect(alert).toHaveClass(`alert-${variant}`);
        unmount();
      });
    });

    it('renders with heading', () => {
      render(<Alert heading="Alert Heading">Message content</Alert>);
      expect(screen.getByText('Alert Heading')).toBeInTheDocument();
      expect(screen.getByText('Message content')).toBeInTheDocument();
    });
  });

  describe('Brand Theming', () => {
    it('renders without brand class by default', () => {
      const { container } = render(<Alert>Alert message</Alert>);
      const alert = container.querySelector('.alert');
      expect(alert).not.toHaveClass('alert-brand-energia');
      expect(alert).not.toHaveClass('alert-brand-powerni');
    });

    it('renders with Energia brand', () => {
      const { container } = render(<Alert brand="energia">Alert message</Alert>);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveClass('alert-brand-energia');
    });

    it('renders with PowerNI brand', () => {
      const { container } = render(<Alert brand="powerni">Alert message</Alert>);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveClass('alert-brand-powerni');
    });
  });

  describe('Dismissible', () => {
    it('does not show close button by default', () => {
      render(<Alert>Alert message</Alert>);
      expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument();
    });

    it('shows close button when dismissible', () => {
      render(<Alert dismissible>Alert message</Alert>);
      expect(screen.getByLabelText('Close alert')).toBeInTheDocument();
    });

    it('hides alert when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<Alert dismissible>Alert message</Alert>);

      const closeButton = screen.getByLabelText('Close alert');
      await user.click(closeButton);

      expect(screen.queryByText('Alert message')).not.toBeInTheDocument();
    });

    it('calls onDismiss when alert is dismissed', async () => {
      const handleDismiss = vi.fn();
      const user = userEvent.setup();

      render(
        <Alert dismissible onDismiss={handleDismiss}>
          Alert message
        </Alert>
      );

      const closeButton = screen.getByLabelText('Close alert');
      await user.click(closeButton);

      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it('applies dismissible classes', () => {
      const { container } = render(<Alert dismissible>Alert message</Alert>);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveClass('alert-dismissible');
      expect(alert).toHaveClass('fade');
      expect(alert).toHaveClass('show');
    });
  });

  describe('Icons', () => {
    it('does not show icon by default', () => {
      const { container } = render(<Alert>Alert message</Alert>);
      const icon = container.querySelector('.alert-icon');
      expect(icon).not.toBeInTheDocument();
    });

    it('shows default icon when showIcon is true', () => {
      const { container } = render(
        <Alert variant="success" showIcon>
          Alert message
        </Alert>
      );
      const icon = container.querySelector('.alert-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveTextContent('✓');
    });

    it('shows custom icon when provided', () => {
      const { container } = render(<Alert icon={<span>🔔</span>}>Alert message</Alert>);
      const icon = container.querySelector('.alert-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveTextContent('🔔');
    });

    it('custom icon overrides default icon', () => {
      const { container } = render(
        <Alert variant="success" showIcon icon={<span>🎉</span>}>
          Alert message
        </Alert>
      );
      const icon = container.querySelector('.alert-icon');
      expect(icon).toHaveTextContent('🎉');
      expect(icon).not.toHaveTextContent('✓');
    });

    it('icon has aria-hidden attribute', () => {
      const { container } = render(
        <Alert variant="success" showIcon>
          Alert message
        </Alert>
      );
      const icon = container.querySelector('.alert-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('ARIA Attributes', () => {
    it('has role="alert" by default', () => {
      const { container } = render(<Alert>Alert message</Alert>);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveAttribute('role', 'alert');
    });

    it('supports custom role', () => {
      const { container } = render(<Alert role="status">Status message</Alert>);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveAttribute('role', 'status');
    });

    it('has aria-live="assertive" when role is alert', () => {
      const { container } = render(<Alert>Alert message</Alert>);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveAttribute('aria-live', 'assertive');
    });

    it('has aria-live="polite" when role is status', () => {
      const { container } = render(<Alert role="status">Status message</Alert>);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });

    it('has aria-atomic="true"', () => {
      const { container } = render(<Alert>Alert message</Alert>);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveAttribute('aria-atomic', 'true');
    });

    it('supports custom aria-label', () => {
      const { container } = render(<Alert aria-label="Important notification">Alert message</Alert>);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveAttribute('aria-label', 'Important notification');
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      const { container } = render(<Alert className="custom-alert">Alert message</Alert>);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveClass('custom-alert');
      expect(alert).toHaveClass('alert'); // Should still have base class
    });

    it('forwards ref to div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Alert ref={ref}>Alert message</Alert>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes through additional HTML attributes', () => {
      const { container } = render(
        <Alert data-testid="test-alert" id="my-alert">
          Alert message
        </Alert>
      );
      const alert = container.querySelector('.alert');
      expect(alert).toHaveAttribute('data-testid', 'test-alert');
      expect(alert).toHaveAttribute('id', 'my-alert');
    });
  });

  describe('Heading', () => {
    it('renders heading in h4 tag', () => {
      const { container } = render(<Alert heading="Alert Title">Message</Alert>);
      const heading = container.querySelector('.alert-heading');
      expect(heading?.tagName).toBe('H4');
    });

    it('renders without heading when not provided', () => {
      const { container } = render(<Alert>Message</Alert>);
      const heading = container.querySelector('.alert-heading');
      expect(heading).not.toBeInTheDocument();
    });
  });
});
