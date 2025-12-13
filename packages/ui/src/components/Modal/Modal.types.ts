/**
 * Modal Component Types
 */

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether modal is open
   */
  isOpen: boolean;

  /**
   * Callback fired when modal should close
   */
  onClose: () => void;

  /**
   * Modal title
   */
  title?: string;

  /**
   * Modal size
   * @default 'md'
   */
  size?: ModalSize;

  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Whether clicking backdrop closes modal
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Whether pressing Escape closes modal
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Brand theme to apply
   */
  brand?: 'energia' | 'powerni';

  /**
   * Modal content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes for modal dialog
   */
  className?: string;

  /**
   * ARIA label for modal
   */
  'aria-label'?: string;

  /**
   * ARIA labelledby (references title ID)
   */
  'aria-labelledby'?: string;
}
