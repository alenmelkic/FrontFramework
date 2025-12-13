/**
 * Carousel Component Types
 */

export interface CarouselSlide {
  /**
   * Slide content
   */
  content: React.ReactNode;

  /**
   * Alt text for image slides (for accessibility)
   */
  alt?: string;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Carousel slides
   */
  slides: CarouselSlide[];

  /**
   * Whether to autoplay
   * @default false
   */
  autoplay?: boolean;

  /**
   * Autoplay delay in milliseconds
   * @default 3000
   */
  autoplayDelay?: number;

  /**
   * Whether to show navigation arrows
   * @default true
   */
  navigation?: boolean;

  /**
   * Whether to show pagination dots
   * @default true
   */
  pagination?: boolean;

  /**
   * Whether carousel loops
   * @default true
   */
  loop?: boolean;

  /**
   * Brand theme to apply
   */
  brand?: 'energia' | 'powerni';

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * ARIA label for carousel
   */
  'aria-label'?: string;

  /**
   * Number of slides per view
   * @default 1
   */
  slidesPerView?: number;

  /**
   * Space between slides in pixels
   * @default 0
   */
  spaceBetween?: number;
}
