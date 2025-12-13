/**
 * Footer Component Unit Tests
 */

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@tests/test-utils';
import { Footer } from './Footer';

const mockSections = [
  {
    title: 'Product',
    links: [
      { text: 'Features', href: '/features' },
      { text: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { text: 'About', href: '/about' },
      { text: 'Contact', href: '/contact' },
    ],
  },
];

const mockSocialLinks = [
  { text: 'Facebook', href: 'https://facebook.com' },
  { text: 'Twitter', href: 'https://twitter.com' },
];

describe('Footer Component', () => {
  describe('Rendering', () => {
    it('renders footer element', () => {
      const { container } = render(<Footer />);
      expect(container.querySelector('footer')).toBeInTheDocument();
    });

    it('renders copyright text', () => {
      render(<Footer copyright="© 2025 Company" />);
      expect(screen.getByText('© 2025 Company')).toBeInTheDocument();
    });

    it('renders default copyright with current year', () => {
      const { container } = render(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(container.textContent).toContain(currentYear.toString());
    });

    it('renders sections', () => {
      render(<Footer sections={mockSections} />);
      expect(screen.getByText('Product')).toBeInTheDocument();
      expect(screen.getByText('Company')).toBeInTheDocument();
    });

    it('renders section links', () => {
      render(<Footer sections={mockSections} />);
      expect(screen.getByText('Features')).toBeInTheDocument();
      expect(screen.getByText('Pricing')).toBeInTheDocument();
    });

    it('renders social links', () => {
      render(<Footer socialLinks={mockSocialLinks} />);
      expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
      expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      const { container } = render(<Footer />);
      expect(container.querySelector('.footer-default')).toBeInTheDocument();
    });

    it('renders minimal variant', () => {
      const { container } = render(<Footer variant="minimal" />);
      expect(container.querySelector('.footer-minimal')).toBeInTheDocument();
    });

    it('hides sections in minimal variant', () => {
      render(<Footer variant="minimal" sections={mockSections} />);
      expect(screen.queryByText('Product')).not.toBeInTheDocument();
    });
  });

  describe('Brand Theming', () => {
    it('renders without brand class by default', () => {
      const { container } = render(<Footer />);
      expect(container.querySelector('.footer-brand-energia')).not.toBeInTheDocument();
      expect(container.querySelector('.footer-brand-powerni')).not.toBeInTheDocument();
    });

    it('renders with Energia brand', () => {
      const { container } = render(<Footer brand="energia" />);
      expect(container.querySelector('.footer-brand-energia')).toBeInTheDocument();
    });

    it('renders with PowerNI brand', () => {
      const { container } = render(<Footer brand="powerni" />);
      expect(container.querySelector('.footer-brand-powerni')).toBeInTheDocument();
    });
  });

  describe('Links', () => {
    it('renders links with correct href', () => {
      render(<Footer sections={mockSections} />);
      const link = screen.getByText('Features').closest('a');
      expect(link).toHaveAttribute('href', '/features');
    });

    it('adds rel="noopener noreferrer" for external links', () => {
      render(<Footer socialLinks={mockSocialLinks} />);
      const link = screen.getByLabelText('Facebook');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      const { container } = render(<Footer className="custom-footer" />);
      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('custom-footer');
      expect(footer).toHaveClass('footer');
    });

    it('forwards ref to footer element', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Footer ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('FOOTER');
    });
  });
});
