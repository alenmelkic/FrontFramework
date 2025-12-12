/**
 * Button Component Types
 */

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'link'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-light'
  | 'outline-dark';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant (color scheme)
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Brand theme to apply
   */
  brand?: 'energia' | 'powerni';

  /**
   * Whether button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether button is in loading state
   * Shows spinner and disables interaction
   * @default false
   */
  loading?: boolean;

  /**
   * Button type attribute
   * @default 'button'
   */
  type?: ButtonType;

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Button content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}
