import { describe, it, expect, vi } from 'vitest';
import { render } from '@tests/test-utils';
import { runAxeTest } from '@tests/a11y-utils';
import { Carousel } from './Carousel';

// Mock Swiper
vi.mock('swiper/react', () => ({
  Swiper: ({ children, ...props }: any) => (
    <div role="region" aria-label={props['aria-label']} {...props}>
      {children}
    </div>
  ),
  SwiperSlide: ({ children, ...props }: any) => (
    <div role="group" {...props}>{children}</div>
  ),
}));

vi.mock('swiper/modules', () => ({
  Navigation: {},
  Pagination: {},
  Autoplay: {},
  A11y: {},
}));

const mockSlides = [
  { content: <img src="/slide1.jpg" alt="First slide" />, alt: 'First slide' },
  { content: <img src="/slide2.jpg" alt="Second slide" />, alt: 'Second slide' },
];

describe('Carousel Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Carousel slides={mockSlides} />);
    await runAxeTest(container);
  });

  it('should have role="region"', () => {
    const { container } = render(<Carousel slides={mockSlides} />);
    expect(container.querySelector('[role="region"]')).toBeInTheDocument();
  });

  it('should have aria-label', () => {
    render(<Carousel slides={mockSlides} aria-label="Featured products" />);
    const region = document.querySelector('[aria-label="Featured products"]');
    expect(region).toBeInTheDocument();
  });

  it('slides should have role="group"', () => {
    const { container } = render(<Carousel slides={mockSlides} />);
    const groups = container.querySelectorAll('[role="group"]');
    expect(groups.length).toBeGreaterThan(0);
  });
});
