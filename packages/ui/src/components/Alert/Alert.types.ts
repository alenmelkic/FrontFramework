/**
 * Alert Component Types
 */

export type AlertVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alert variant (color scheme)
   * @default 'info'
   */
  variant?: AlertVariant;

  /**
   * Brand theme to apply
   */
  brand?: 'energia' | 'powerni';

  /**
   * Whether the alert can be dismissed
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback fired when alert is dismissed
   */
  onDismiss?: () => void;

  /**
   * Alert heading/title
   */
  heading?: string;

  /**
   * Alert content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * ARIA role override
   * @default 'alert'
   */
  role?: 'alert' | 'status';

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;

  /**
   * Custom icon element to display
   */
  icon?: React.ReactNode;

  /**
   * Whether to show default icon for variant
   * @default false
   */
  showIcon?: boolean;
}
