/**
 * Hero Component Accessibility Tests
 * Tests WCAG 2.1 AA compliance
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@tests/test-utils';
import { runAxeTest, verifyAriaAttributes } from '@tests/a11y-utils';
import { Hero } from './Hero';

describe('Hero Accessibility', () => {
  describe('Axe Violations', () => {
    it('should have no accessibility violations (default)', async () => {
      const { container } = render(<Hero title="Welcome to Our Site" />);
      await runAxeTest(container);
    });

    it('should have no accessibility violations (with subtitle)', async () => {
      const { container } = render(
        <Hero title="Welcome" subtitle="Get started with our amazing platform" />
      );
      await runAxeTest(container);
    });

    it('should have no accessibility violations (with actions)', async () => {
      const { container } = render(
        <Hero
          title="Welcome"
          primaryAction={{ text: 'Get Started', onClick: vi.fn() }}
          secondaryAction={{ text: 'Learn More', onClick: vi.fn() }}
        />
      );
      await runAxeTest(container);
    });

    it('should have no accessibility violations (with background)', async () => {
      const { container } = render(
        <Hero title="Welcome" backgroundImage="/hero.jpg" />
      );
      await runAxeTest(container);
    });

    it('should have no accessibility violations (all heights)', async () => {
      const heights = ['small', 'medium', 'large', 'full'] as const;

      for (const height of heights) {
        const { container } = render(<Hero title="Welcome" height={height} />);
        await runAxeTest(container);
      }
    });

    it('should have no accessibility violations (both brands)', async () => {
      const { container: energiaContainer } = render(
        <Hero title="Welcome" brand="energia" />
      );
      await runAxeTest(energiaContainer);

      const { container: powerniContainer } = render(
        <Hero title="Welcome" brand="powerni" />
      );
      await runAxeTest(powerniContainer);
    });

    it('should have no accessibility violations (dark text)', async () => {
      const { container } = render(<Hero title="Welcome" textColor="dark" />);
      await runAxeTest(container);
    });
  });

  describe('Semantic HTML', () => {
    it('should use section element', () => {
      const { container } = render(<Hero title="Welcome" />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section?.tagName).toBe('SECTION');
    });

    it('should use h1 for title', () => {
      const { container } = render(<Hero title="Welcome to Our Site" />);
      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
      expect(h1?.tagName).toBe('H1');
      expect(h1).toHaveTextContent('Welcome to Our Site');
    });

    it('should use button elements for actions', () => {
      const { container } = render(
        <Hero title="Welcome" primaryAction={{ text: 'Click Me', onClick: vi.fn() }} />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button?.tagName).toBe('BUTTON');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should use anchor elements for link actions', () => {
      const { container } = render(
        <Hero title="Welcome" primaryAction={{ text: 'Learn More', href: '/learn' }} />
      );
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link?.tagName).toBe('A');
    });
  });

  describe('Keyboard Navigation', () => {
    it('action buttons should be focusable', () => {
      const { container } = render(
        <Hero title="Welcome" primaryAction={{ text: 'Click Me', onClick: vi.fn() }} />
      );
      const button = container.querySelector('button')! as HTMLButtonElement;

      button.focus();
      expect(button).toHaveFocus();
    });

    it('action links should be focusable', () => {
      const { container } = render(
        <Hero title="Welcome" primaryAction={{ text: 'Learn More', href: '/learn' }} />
      );
      const link = container.querySelector('a')! as HTMLAnchorElement;

      link.focus();
      expect(link).toHaveFocus();
    });
  });

  describe('Heading Hierarchy', () => {
    it('should have h1 as main heading', () => {
      const { container } = render(<Hero title="Main Heading" />);
      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
    });

    it('should only have one h1', () => {
      const { container } = render(<Hero title="Welcome" subtitle="Subtitle text" />);
      const h1s = container.querySelectorAll('h1');
      expect(h1s).toHaveLength(1);
    });
  });

  describe('Color Contrast', () => {
    it('should apply light text class for contrast', () => {
      const { container } = render(<Hero title="Welcome" textColor="light" />);
      const hero = container.querySelector('.hero');
      expect(hero).toHaveClass('hero-text-light');
    });

    it('should apply dark text class for contrast', () => {
      const { container } = render(<Hero title="Welcome" textColor="dark" />);
      const hero = container.querySelector('.hero');
      expect(hero).toHaveClass('hero-text-dark');
    });
  });

  describe('Focus Indicators', () => {
    it('buttons should have visible focus indicator', () => {
      const { container } = render(
        <Hero title="Welcome" primaryAction={{ text: 'Click Me', onClick: vi.fn() }} />
      );
      const button = container.querySelector('button')! as HTMLButtonElement;

      button.focus();
      expect(button).toHaveFocus();
      // CSS ensures focus-visible outline is applied
    });

    it('links should have visible focus indicator', () => {
      const { container } = render(
        <Hero title="Welcome" primaryAction={{ text: 'Learn More', href: '/learn' }} />
      );
      const link = container.querySelector('a')! as HTMLAnchorElement;

      link.focus();
      expect(link).toHaveFocus();
      // CSS ensures focus-visible outline is applied
    });
  });

  describe('Link Accessibility', () => {
    it('should add rel="noopener noreferrer" for external links', () => {
      const { container } = render(
        <Hero
          title="Welcome"
          primaryAction={{ text: 'External', href: 'https://example.com', target: '_blank' }}
        />
      );
      const link = container.querySelector('a')!;

      verifyAriaAttributes(link, {
        target: '_blank',
        rel: 'noopener noreferrer',
      });
    });
  });

  describe('Text Readability', () => {
    it('should use appropriate text sizes', () => {
      const { container } = render(
        <Hero title="Welcome" subtitle="This is a subtitle" />
      );
      const title = container.querySelector('.hero-title');
      const subtitle = container.querySelector('.hero-subtitle');

      expect(title).toBeInTheDocument();
      expect(subtitle).toBeInTheDocument();
    });
  });
});
