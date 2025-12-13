import { describe, it, expect, vi } from 'vitest';
import { render } from '@tests/test-utils';
import { runAxeTest } from '@tests/a11y-utils';
import { Modal } from './Modal';

describe('Modal Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Modal isOpen onClose={vi.fn()} title="Test">Content</Modal>);
    await runAxeTest(container);
  });

  it('should have role="dialog"', () => {
    const { container } = render(<Modal isOpen onClose={vi.fn()}>Content</Modal>);
    expect(container.querySelector('[role="dialog"]')).toBeInTheDocument();
  });

  it('should have aria-modal="true"', () => {
    const { container } = render(<Modal isOpen onClose={vi.fn()}>Content</Modal>);
    expect(container.querySelector('[aria-modal="true"]')).toBeInTheDocument();
  });

  it('should link title with aria-labelledby', () => {
    render(<Modal isOpen onClose={vi.fn()} title="Test Modal">Content</Modal>);
    const dialog = document.querySelector('[role="dialog"]');
    const title = document.querySelector('.modal-title');
    const labelledBy = dialog?.getAttribute('aria-labelledby');
    expect(title?.id).toBeTruthy();
    expect(labelledBy).toBe(title?.id);
  });
});
