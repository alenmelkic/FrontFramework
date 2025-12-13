/**
 * FormSelect Component Types
 */

export type FormSelectSize = 'sm' | 'md' | 'lg';

export interface FormSelectOption {
  /**
   * Option value
   */
  value: string | number;

  /**
   * Option label (display text)
   */
  label: string;

  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}

export interface FormSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Select label text
   */
  label?: string;

  /**
   * Select size
   * @default 'md'
   */
  size?: FormSelectSize;

  /**
   * Brand theme to apply
   */
  brand?: 'energia' | 'powerni';

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Helper text to display below select
   */
  helperText?: string;

  /**
   * Whether the select is required
   * @default false
   */
  required?: boolean;

  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Placeholder text (shown as first disabled option)
   */
  placeholder?: string;

  /**
   * Selected value
   */
  value?: string | number;

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;

  /**
   * Array of select options
   */
  options: FormSelectOption[];

  /**
   * Additional CSS classes for the select element
   */
  className?: string;

  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;

  /**
   * ID for the select element
   */
  id?: string;

  /**
   * Name attribute for the select
   */
  name?: string;

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;

  /**
   * ARIA described by for accessibility
   */
  'aria-describedby'?: string;
}
