/**
 * Footer Component Accessibility Tests
 */

import { describe, it, expect } from 'vitest';
import { render } from '@tests/test-utils';
import { runAxeTest } from '@tests/a11y-utils';
import { Footer } from './Footer';

const mockSections = [
  {
    title: 'Product',
    links: [{ text: 'Features', href: '/features' }],
  },
];

describe('Footer Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Footer sections={mockSections} />);
    await runAxeTest(container);
  });

  it('should use footer element', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('should have proper heading hierarchy', () => {
    const { container } = render(<Footer sections={mockSections} />);
    const heading = container.querySelector('h3');
    expect(heading).toBeInTheDocument();
  });

  it('social links should have aria-label', () => {
    const socialLinks = [{ text: 'Facebook', href: 'https://facebook.com' }];
    render(<Footer socialLinks={socialLinks} />);
    const link = document.querySelector('[aria-label="Facebook"]');
    expect(link).toBeInTheDocument();
  });
});
