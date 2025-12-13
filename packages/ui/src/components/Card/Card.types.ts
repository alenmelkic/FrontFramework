/**
 * Card Component Types
 */

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Card header content
   */
  header?: React.ReactNode;

  /**
   * Card body content
   */
  body?: React.ReactNode;

  /**
   * Card footer content
   */
  footer?: React.ReactNode;

  /**
   * Image URL for card
   */
  image?: string;

  /**
   * Alt text for image (required if image is provided)
   */
  imageAlt?: string;

  /**
   * Image position
   * @default 'top'
   */
  imagePosition?: 'top' | 'bottom';

  /**
   * Link URL (makes entire card clickable)
   */
  href?: string;

  /**
   * Brand theme to apply
   */
  brand?: 'energia' | 'powerni';

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Card content (used when not using header/body/footer)
   */
  children?: React.ReactNode;

  /**
   * Target for link
   */
  target?: '_blank' | '_self' | '_parent' | '_top';

  /**
   * Rel attribute for link
   */
  rel?: string;

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;

  /**
   * Whether card has border
   * @default true
   */
  bordered?: boolean;

  /**
   * Card text alignment
   */
  textAlign?: 'start' | 'center' | 'end';
}
