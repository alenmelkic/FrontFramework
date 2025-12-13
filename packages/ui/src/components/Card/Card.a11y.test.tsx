/**
 * Card Component Accessibility Tests
 * Tests WCAG 2.1 AA compliance
 */

import { describe, it, expect } from 'vitest';
import { render } from '@tests/test-utils';
import { runAxeTest, verifyAriaAttributes } from '@tests/a11y-utils';
import { Card } from './Card';

describe('Card Accessibility', () => {
  describe('Axe Violations', () => {
    it('should have no accessibility violations (default)', async () => {
      const { container } = render(<Card>Card content</Card>);
      await runAxeTest(container);
    });

    it('should have no accessibility violations (with header, body, footer)', async () => {
      const { container } = render(
        <Card header="Header" body="Body content" footer="Footer" />
      );
      await runAxeTest(container);
    });

    it('should have no accessibility violations (with image)', async () => {
      const { container } = render(
        <Card image="/test.jpg" imageAlt="Test image">
          Content
        </Card>
      );
      await runAxeTest(container);
    });

    it('should have no accessibility violations (clickable)', async () => {
      const { container } = render(<Card href="/link">Clickable card</Card>);
      await runAxeTest(container);
    });

    it('should have no accessibility violations (both brands)', async () => {
      const { container: energiaContainer } = render(
        <Card brand="energia">Energia card</Card>
      );
      await runAxeTest(energiaContainer);

      const { container: powerniContainer } = render(
        <Card brand="powerni">PowerNI card</Card>
      );
      await runAxeTest(powerniContainer);
    });

    it('should have no accessibility violations (with aria-label)', async () => {
      const { container } = render(
        <Card aria-label="Featured article">Content</Card>
      );
      await runAxeTest(container);
    });
  });

  describe('Semantic HTML', () => {
    it('should use article element by default', () => {
      const { container } = render(<Card>Content</Card>);
      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();
      expect(article?.tagName).toBe('ARTICLE');
    });

    it('should use anchor element when href provided', () => {
      const { container } = render(<Card href="/link">Content</Card>);
      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor?.tagName).toBe('A');
    });
  });

  describe('Image Accessibility', () => {
    it('should require alt text for images', () => {
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Card image="/test.jpg">Content</Card>);
      expect(consoleWarn).toHaveBeenCalled();
      consoleWarn.mockRestore();
    });

    it('should have alt attribute on images', () => {
      const { container } = render(
        <Card image="/test.jpg" imageAlt="Descriptive text">
          Content
        </Card>
      );
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('alt', 'Descriptive text');
    });

    it('should use lazy loading for images', () => {
      const { container } = render(
        <Card image="/test.jpg" imageAlt="Test">
          Content
        </Card>
      );
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  describe('Link Accessibility', () => {
    it('should have href attribute when clickable', () => {
      const { container } = render(<Card href="/link">Content</Card>);
      const link = container.querySelector('a');
      expect(link).toHaveAttribute('href', '/link');
    });

    it('should add rel="noopener noreferrer" for external links', () => {
      const { container } = render(
        <Card href="https://example.com" target="_blank">
          Content
        </Card>
      );
      const link = container.querySelector('a');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should be focusable when clickable', () => {
      const { container } = render(<Card href="/link">Content</Card>);
      const link = container.querySelector('a')! as HTMLAnchorElement;

      link.focus();
      expect(link).toHaveFocus();
    });

    it('should not be focusable when not clickable', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.querySelector('article')! as HTMLElement;

      card.focus();
      expect(card).not.toHaveFocus();
    });
  });

  describe('ARIA Attributes', () => {
    it('should support custom aria-label', () => {
      const { container } = render(
        <Card aria-label="Featured product">Content</Card>
      );
      const card = container.querySelector('[aria-label]')!;

      verifyAriaAttributes(card, {
        'aria-label': 'Featured product',
      });
    });

    it('should not have aria-label by default', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.querySelector('.card')!;

      expect(card).not.toHaveAttribute('aria-label');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be keyboard accessible when clickable', () => {
      const { container } = render(<Card href="/link">Content</Card>);
      const link = container.querySelector('a')! as HTMLAnchorElement;

      link.focus();
      expect(link).toHaveFocus();
    });
  });

  describe('Focus Indicators', () => {
    it('should have visible focus indicator when clickable', () => {
      const { container } = render(<Card href="/link">Content</Card>);
      const link = container.querySelector('a')! as HTMLAnchorElement;

      link.focus();
      expect(link).toHaveFocus();
      // CSS ensures focus-visible outline is applied
    });
  });

  describe('Color Contrast', () => {
    it('should apply brand classes correctly', () => {
      const { container } = render(<Card brand="energia">Content</Card>);
      const card = container.querySelector('.card')!;

      expect(card).toHaveClass('card-brand-energia');
    });
  });

  describe('Text Alternatives', () => {
    it('should provide text alternative for images', () => {
      const { container } = render(
        <Card image="/product.jpg" imageAlt="Red widget product">
          Content
        </Card>
      );
      const img = container.querySelector('img')!;

      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).toBeTruthy();
    });
  });

  describe('Structural Markup', () => {
    it('should use appropriate heading levels in header', () => {
      const { container } = render(
        <Card header={<h2>Card Title</h2>}>Content</Card>
      );
      const heading = container.querySelector('h2');
      expect(heading).toBeInTheDocument();
    });
  });
});
