/**
 * Hero Component Types
 */

export interface HeroAction {
  /**
   * Button text
   */
  text: string;

  /**
   * Button click handler or href
   */
  onClick?: () => void;

  /**
   * Link URL (alternative to onClick)
   */
  href?: string;

  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary';

  /**
   * Link target
   */
  target?: '_blank' | '_self';
}

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Hero title (h1)
   */
  title: string;

  /**
   * Hero subtitle/description
   */
  subtitle?: string;

  /**
   * Background image URL
   */
  backgroundImage?: string;

  /**
   * Overlay opacity (0-1)
   * @default 0.5
   */
  overlayOpacity?: number;

  /**
   * Primary action button
   */
  primaryAction?: HeroAction;

  /**
   * Secondary action button
   */
  secondaryAction?: HeroAction;

  /**
   * Brand theme to apply
   */
  brand?: 'energia' | 'powerni';

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Hero height
   * @default 'medium'
   */
  height?: 'small' | 'medium' | 'large' | 'full';

  /**
   * Content alignment
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end';

  /**
   * Text color
   * @default 'light'
   */
  textColor?: 'light' | 'dark';
}
