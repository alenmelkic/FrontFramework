/**
 * Navbar Component Types
 */

export interface NavLink {
  /**
   * Link text
   */
  text: string;

  /**
   * Link URL
   */
  href: string;

  /**
   * Whether link is active/current
   */
  active?: boolean;

  /**
   * Link target
   */
  target?: '_blank' | '_self';
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Brand/logo text
   */
  brandText?: string;

  /**
   * Brand/logo image
   */
  brandImage?: string;

  /**
   * Brand/logo link URL
   */
  brandHref?: string;

  /**
   * Navigation links
   */
  links?: NavLink[];

  /**
   * Brand theme to apply
   */
  brand?: 'energia' | 'powerni';

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Navbar variant
   * @default 'light'
   */
  variant?: 'light' | 'dark';

  /**
   * Whether navbar is sticky
   * @default false
   */
  sticky?: boolean;

  /**
   * Additional content (buttons, search, etc.)
   */
  children?: React.ReactNode;
}
