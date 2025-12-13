/**
 * Card Component Unit Tests
 */

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@tests/test-utils';
import { Card } from './Card';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders with children', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders with header, body, and footer', () => {
      render(
        <Card header="Card Header" body="Card Body" footer="Card Footer" />
      );
      expect(screen.getByText('Card Header')).toBeInTheDocument();
      expect(screen.getByText('Card Body')).toBeInTheDocument();
      expect(screen.getByText('Card Footer')).toBeInTheDocument();
    });

    it('renders with only header', () => {
      render(<Card header="Header Only" />);
      expect(screen.getByText('Header Only')).toBeInTheDocument();
    });

    it('renders with only body', () => {
      render(<Card body="Body Only" />);
      expect(screen.getByText('Body Only')).toBeInTheDocument();
    });

    it('renders with only footer', () => {
      render(<Card footer="Footer Only" />);
      expect(screen.getByText('Footer Only')).toBeInTheDocument();
    });

    it('prefers structured content over children', () => {
      render(<Card body="Structured body">Children content</Card>);
      expect(screen.getByText('Structured body')).toBeInTheDocument();
      expect(screen.queryByText('Children content')).not.toBeInTheDocument();
    });
  });

  describe('Images', () => {
    it('renders with image at top', () => {
      const { container } = render(
        <Card image="/test-image.jpg" imageAlt="Test image">
          Content
        </Card>
      );
      const img = container.querySelector('.card-img-top');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', '/test-image.jpg');
      expect(img).toHaveAttribute('alt', 'Test image');
    });

    it('renders with image at bottom', () => {
      const { container } = render(
        <Card image="/test-image.jpg" imageAlt="Test image" imagePosition="bottom">
          Content
        </Card>
      );
      const img = container.querySelector('.card-img-bottom');
      expect(img).toBeInTheDocument();
    });

    it('has loading="lazy" on images', () => {
      const { container } = render(
        <Card image="/test-image.jpg" imageAlt="Test image">
          Content
        </Card>
      );
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('loading', 'lazy');
    });

    it('warns when image has no alt text', () => {
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Card image="/test-image.jpg">Content</Card>);
      expect(consoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('imageAlt is required')
      );
      consoleWarn.mockRestore();
    });
  });

  describe('Clickable Cards', () => {
    it('renders as article by default', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.querySelector('article');
      expect(card).toBeInTheDocument();
    });

    it('renders as anchor when href is provided', () => {
      const { container } = render(<Card href="/link">Content</Card>);
      const card = container.querySelector('a');
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('href', '/link');
    });

    it('applies card-clickable class when href is provided', () => {
      const { container } = render(<Card href="/link">Content</Card>);
      const card = container.querySelector('.card-clickable');
      expect(card).toBeInTheDocument();
    });

    it('supports target attribute', () => {
      const { container } = render(
        <Card href="/link" target="_blank">
          Content
        </Card>
      );
      const card = container.querySelector('a');
      expect(card).toHaveAttribute('target', '_blank');
    });

    it('adds rel="noopener noreferrer" for _blank target', () => {
      const { container } = render(
        <Card href="/link" target="_blank">
          Content
        </Card>
      );
      const card = container.querySelector('a');
      expect(card).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('supports custom rel attribute', () => {
      const { container } = render(
        <Card href="/link" rel="author">
          Content
        </Card>
      );
      const card = container.querySelector('a');
      expect(card).toHaveAttribute('rel', 'author');
    });
  });

  describe('Brand Theming', () => {
    it('renders without brand class by default', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.querySelector('.card');
      expect(card).not.toHaveClass('card-brand-energia');
      expect(card).not.toHaveClass('card-brand-powerni');
    });

    it('renders with Energia brand', () => {
      const { container } = render(<Card brand="energia">Content</Card>);
      const card = container.querySelector('.card');
      expect(card).toHaveClass('card-brand-energia');
    });

    it('renders with PowerNI brand', () => {
      const { container } = render(<Card brand="powerni">Content</Card>);
      const card = container.querySelector('.card');
      expect(card).toHaveClass('card-brand-powerni');
    });
  });

  describe('Styling', () => {
    it('has border by default', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.querySelector('.card');
      expect(card).not.toHaveClass('border-0');
    });

    it('removes border when bordered=false', () => {
      const { container } = render(<Card bordered={false}>Content</Card>);
      const card = container.querySelector('.card');
      expect(card).toHaveClass('border-0');
    });

    it('supports text alignment', () => {
      const { container } = render(<Card textAlign="center">Content</Card>);
      const card = container.querySelector('.card');
      expect(card).toHaveClass('text-center');
    });
  });

  describe('Accessibility', () => {
    it('supports custom aria-label', () => {
      const { container } = render(<Card aria-label="Featured article">Content</Card>);
      const card = container.querySelector('[aria-label="Featured article"]');
      expect(card).toBeInTheDocument();
    });

    it('uses article element for semantic HTML', () => {
      const { container } = render(<Card>Content</Card>);
      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      const { container } = render(<Card className="custom-card">Content</Card>);
      const card = container.querySelector('.card');
      expect(card).toHaveClass('custom-card');
      expect(card).toHaveClass('card');
    });

    it('forwards ref to element', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Card ref={ref}>Content</Card>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it('passes through additional HTML attributes', () => {
      const { container } = render(
        <Card data-testid="test-card" id="my-card">
          Content
        </Card>
      );
      const card = container.querySelector('.card');
      expect(card).toHaveAttribute('data-testid', 'test-card');
      expect(card).toHaveAttribute('id', 'my-card');
    });
  });

  describe('Layout Structure', () => {
    it('wraps children in card-body', () => {
      const { container } = render(<Card>Simple content</Card>);
      const cardBody = container.querySelector('.card-body');
      expect(cardBody).toBeInTheDocument();
      expect(cardBody).toHaveTextContent('Simple content');
    });

    it('uses card-header class for header', () => {
      const { container } = render(<Card header="Header">Body</Card>);
      const cardHeader = container.querySelector('.card-header');
      expect(cardHeader).toBeInTheDocument();
      expect(cardHeader).toHaveTextContent('Header');
    });

    it('uses card-footer class for footer', () => {
      const { container } = render(<Card footer="Footer">Body</Card>);
      const cardFooter = container.querySelector('.card-footer');
      expect(cardFooter).toBeInTheDocument();
      expect(cardFooter).toHaveTextContent('Footer');
    });
  });
});
