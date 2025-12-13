import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@tests/test-utils';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal Component', () => {
  it('renders when open', () => {
    render(<Modal isOpen onClose={vi.fn()}>Content</Modal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<Modal isOpen={false} onClose={vi.fn()}>Content</Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders title', () => {
    render(<Modal isOpen onClose={vi.fn()} title="Modal Title">Content</Modal>);
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Modal isOpen onClose={vi.fn()}>Modal Content</Modal>);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    render(<Modal isOpen onClose={handleClose}>Content</Modal>);
    
    await user.click(screen.getByLabelText('Close modal'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape pressed', () => {
    const handleClose = vi.fn();
    render(<Modal isOpen onClose={handleClose}>Content</Modal>);
    
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('applies size classes', () => {
    const { container } = render(<Modal isOpen onClose={vi.fn()} size="lg">Content</Modal>);
    expect(container.querySelector('.modal-lg')).toBeInTheDocument();
  });

  it('applies brand theming', () => {
    const { container } = render(<Modal isOpen onClose={vi.fn()} brand="energia">Content</Modal>);
    expect(container.querySelector('.modal-brand-energia')).toBeInTheDocument();
  });
});
