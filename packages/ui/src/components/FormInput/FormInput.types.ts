/**
 * FormInput Component Types
 */

export type FormInputType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search';

export type FormInputSize = 'sm' | 'md' | 'lg';

export interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input label text
   */
  label?: string;

  /**
   * Input type
   * @default 'text'
   */
  type?: FormInputType;

  /**
   * Input size
   * @default 'md'
   */
  size?: FormInputSize;

  /**
   * Brand theme to apply
   */
  brand?: 'energia' | 'powerni';

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Helper text to display below input
   */
  helperText?: string;

  /**
   * Whether the input is required
   * @default false
   */
  required?: boolean;

  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Input value
   */
  value?: string | number;

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Additional CSS classes for the input element
   */
  className?: string;

  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;

  /**
   * ID for the input element
   */
  id?: string;

  /**
   * Name attribute for the input
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
