/**
 * Hero Component Unit Tests
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@tests/test-utils';
import userEvent from '@testing-library/user-event';
import { Hero } from './Hero';

describe('Hero Component', () => {
  describe('Rendering', () => {
    it('renders with title', () => {
      render(<Hero title="Welcome" />);
      expect(screen.getByText('Welcome')).toBeInTheDocument();
    });

    it('renders title in h1 tag', () => {
      const { container } = render(<Hero title="Welcome" />);
      const h1 = container.querySelector('h1');
      expect(h1).toHaveTextContent('Welcome');
    });

    it('renders with subtitle', () => {
      render(<Hero title="Welcome" subtitle="Get started today" />);
      expect(screen.getByText('Get started today')).toBeInTheDocument();
    });

    it('renders without subtitle', () => {
      const { container } = render(<Hero title="Welcome" />);
      expect(container.querySelector('.hero-subtitle')).not.toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('renders without actions by default', () => {
      render(<Hero title="Welcome" />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders primary action button', () => {
      render(
        <Hero
          title="Welcome"
          primaryAction={{ text: 'Get Started', onClick: vi.fn() }}
        />
      );
      expect(screen.getByRole('button', { name: 'Get Started' })).toBeInTheDocument();
    });

    it('renders primary action as link', () => {
      render(
        <Hero title="Welcome" primaryAction={{ text: 'Learn More', href: '/learn' }} />
      );
      const link = screen.getByRole('link', { name: 'Learn More' });
      expect(link).toHaveAttribute('href', '/learn');
    });

    it('renders secondary action', () => {
      render(
        <Hero
          title="Welcome"
          secondaryAction={{ text: 'Watch Video', onClick: vi.fn() }}
        />
      );
      expect(screen.getByRole('button', { name: 'Watch Video' })).toBeInTheDocument();
    });

    it('renders both actions', () => {
      render(
        <Hero
          title="Welcome"
          primaryAction={{ text: 'Get Started', onClick: vi.fn() }}
          secondaryAction={{ text: 'Learn More', onClick: vi.fn() }}
        />
      );
      expect(screen.getByRole('button', { name: 'Get Started' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Learn More' })).toBeInTheDocument();
    });

    it('calls onClick when button clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Hero title="Welcome" primaryAction={{ text: 'Click Me', onClick: handleClick }} />
      );

      await user.click(screen.getByRole('button', { name: 'Click Me' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports custom button variants', () => {
      const { container } = render(
        <Hero
          title="Welcome"
          primaryAction={{ text: 'Primary', variant: 'outline-primary' }}
        />
      );
      const button = container.querySelector('.btn-outline-primary');
      expect(button).toBeInTheDocument();
    });

    it('uses default variants when not specified', () => {
      const { container } = render(
        <Hero
          title="Welcome"
          primaryAction={{ text: 'Primary' }}
          secondaryAction={{ text: 'Secondary' }}
        />
      );
      expect(container.querySelector('.btn-primary')).toBeInTheDocument();
      expect(container.querySelector('.btn-secondary')).toBeInTheDocument();
    });

    it('opens external links in new tab', () => {
      render(
        <Hero
          title="Welcome"
          primaryAction={{ text: 'External', href: 'https://example.com', target: '_blank' }}
        />
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Background', () => {
    it('renders without background by default', () => {
      const { container } = render(<Hero title="Welcome" />);
      expect(container.querySelector('.hero-with-background')).not.toBeInTheDocument();
    });

    it('applies background image', () => {
      const { container } = render(
        <Hero title="Welcome" backgroundImage="/hero-bg.jpg" />
      );
      const hero = container.querySelector('.hero');
      expect(hero).toHaveStyle({ backgroundImage: 'url(/hero-bg.jpg)' });
    });

    it('renders overlay when background image present', () => {
      const { container } = render(
        <Hero title="Welcome" backgroundImage="/hero-bg.jpg" />
      );
      expect(container.querySelector('.hero-overlay')).toBeInTheDocument();
    });

    it('applies custom overlay opacity', () => {
      const { container } = render(
        <Hero title="Welcome" backgroundImage="/hero-bg.jpg" overlayOpacity={0.7} />
      );
      const overlay = container.querySelector('.hero-overlay');
      expect(overlay).toHaveStyle({ backgroundColor: 'rgba(0, 0, 0, 0.7)' });
    });

    it('uses default overlay opacity', () => {
      const { container } = render(
        <Hero title="Welcome" backgroundImage="/hero-bg.jpg" />
      );
      const overlay = container.querySelector('.hero-overlay');
      expect(overlay).toHaveStyle({ backgroundColor: 'rgba(0, 0, 0, 0.5)' });
    });
  });

  describe('Height Variants', () => {
    it('applies default height (medium)', () => {
      const { container } = render(<Hero title="Welcome" />);
      expect(container.querySelector('.hero-medium')).toBeInTheDocument();
    });

    it('applies small height', () => {
      const { container } = render(<Hero title="Welcome" height="small" />);
      expect(container.querySelector('.hero-small')).toBeInTheDocument();
    });

    it('applies large height', () => {
      const { container } = render(<Hero title="Welcome" height="large" />);
      expect(container.querySelector('.hero-large')).toBeInTheDocument();
    });

    it('applies full height', () => {
      const { container } = render(<Hero title="Welcome" height="full" />);
      expect(container.querySelector('.hero-full')).toBeInTheDocument();
    });
  });

  describe('Alignment', () => {
    it('applies default alignment (center)', () => {
      const { container } = render(<Hero title="Welcome" />);
      expect(container.querySelector('.hero-align-center')).toBeInTheDocument();
    });

    it('applies start alignment', () => {
      const { container } = render(<Hero title="Welcome" align="start" />);
      expect(container.querySelector('.hero-align-start')).toBeInTheDocument();
    });

    it('applies end alignment', () => {
      const { container } = render(<Hero title="Welcome" align="end" />);
      expect(container.querySelector('.hero-align-end')).toBeInTheDocument();
    });
  });

  describe('Text Color', () => {
    it('applies default text color (light)', () => {
      const { container } = render(<Hero title="Welcome" />);
      expect(container.querySelector('.hero-text-light')).toBeInTheDocument();
    });

    it('applies dark text color', () => {
      const { container } = render(<Hero title="Welcome" textColor="dark" />);
      expect(container.querySelector('.hero-text-dark')).toBeInTheDocument();
    });
  });

  describe('Brand Theming', () => {
    it('renders without brand class by default', () => {
      const { container } = render(<Hero title="Welcome" />);
      expect(container.querySelector('.hero-brand-energia')).not.toBeInTheDocument();
      expect(container.querySelector('.hero-brand-powerni')).not.toBeInTheDocument();
    });

    it('renders with Energia brand', () => {
      const { container } = render(<Hero title="Welcome" brand="energia" />);
      expect(container.querySelector('.hero-brand-energia')).toBeInTheDocument();
    });

    it('renders with PowerNI brand', () => {
      const { container } = render(<Hero title="Welcome" brand="powerni" />);
      expect(container.querySelector('.hero-brand-powerni')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      const { container } = render(<Hero title="Welcome" className="custom-hero" />);
      const hero = container.querySelector('.hero');
      expect(hero).toHaveClass('custom-hero');
      expect(hero).toHaveClass('hero');
    });

    it('forwards ref to section element', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Hero title="Welcome" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('SECTION');
    });

    it('passes through additional HTML attributes', () => {
      const { container } = render(
        <Hero title="Welcome" data-testid="test-hero" id="my-hero" />
      );
      const hero = container.querySelector('.hero');
      expect(hero).toHaveAttribute('data-testid', 'test-hero');
      expect(hero).toHaveAttribute('id', 'my-hero');
    });
  });
});
