import { describe, it, expect } from 'vitest';
import { render } from '@tests/test-utils';
import { runAxeTest } from '@tests/a11y-utils';
import { Navbar } from './Navbar';

describe('Navbar Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Navbar brandText="Brand" links={[{ text: 'Home', href: '/' }]} />);
    await runAxeTest(container);
  });

  it('should use nav element', () => {
    const { container } = render(<Navbar />);
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('toggle button should have aria-label', () => {
    render(<Navbar />);
    expect(screen.getByLabelText('Toggle navigation')).toBeInTheDocument();
  });

  it('active link should have aria-current', () => {
    render(<Navbar links={[{ text: 'Home', href: '/', active: true }]} />);
    const link = screen.getByText('Home');
    expect(link).toHaveAttribute('aria-current', 'page');
  });
});
