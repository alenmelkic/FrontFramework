/**
 * Footer Component Types
 */

export interface FooterLink {
  /**
   * Link text
   */
  text: string;

  /**
   * Link URL
   */
  href: string;

  /**
   * Link target
   */
  target?: '_blank' | '_self';
}

export interface FooterSection {
  /**
   * Section title
   */
  title: string;

  /**
   * Section links
   */
  links: FooterLink[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Footer sections (columns)
   */
  sections?: FooterSection[];

  /**
   * Copyright text
   */
  copyright?: string;

  /**
   * Social media links
   */
  socialLinks?: FooterLink[];

  /**
   * Brand theme to apply
   */
  brand?: 'energia' | 'powerni';

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Footer variant
   * @default 'default'
   */
  variant?: 'default' | 'minimal';
}
