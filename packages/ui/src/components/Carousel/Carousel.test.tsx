import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@tests/test-utils';
import { Carousel } from './Carousel';

// Mock Swiper
vi.mock('swiper/react', () => ({
  Swiper: ({ children, ...props }: any) => <div data-testid="swiper" {...props}>{children}</div>,
  SwiperSlide: ({ children }: any) => <div data-testid="swiper-slide">{children}</div>,
}));

vi.mock('swiper/modules', () => ({
  Navigation: {},
  Pagination: {},
  Autoplay: {},
  A11y: {},
}));

const mockSlides = [
  { content: <div>Slide 1</div>, alt: 'First slide' },
  { content: <div>Slide 2</div>, alt: 'Second slide' },
  { content: <div>Slide 3</div>, alt: 'Third slide' },
];

describe('Carousel Component', () => {
  it('renders slides', () => {
    render(<Carousel slides={mockSlides} />);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('renders correct number of slides', () => {
    const { container } = render(<Carousel slides={mockSlides} />);
    const slides = container.querySelectorAll('[data-testid="swiper-slide"]');
    expect(slides).toHaveLength(3);
  });

  it('applies brand theming', () => {
    const { container } = render(<Carousel slides={mockSlides} brand="energia" />);
    expect(container.querySelector('.carousel-brand-energia')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Carousel slides={mockSlides} className="custom-carousel" />);
    expect(container.querySelector('.custom-carousel')).toBeInTheDocument();
  });
});
