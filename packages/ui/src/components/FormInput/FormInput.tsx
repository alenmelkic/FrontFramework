/**
 * FormInput Component
 * Accessible text input with label, validation, and error states
 */

import React, { useId } from 'react';
import { FormInputProps } from './FormInput.types';
import './FormInput.bootstrap.scss';

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      type = 'text',
      size = 'md',
      brand,
      error,
      helperText,
      required = false,
      disabled = false,
      placeholder,
      value,
      onChange,
      className = '',
      containerClassName = '',
      id: providedId,
      name,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref
  ) => {
    // Generate unique IDs for accessibility
    const generatedId = useId();
    const inputId = providedId || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Build input CSS classes
    const inputClasses = [
      'form-control',
      size !== 'md' && `form-control-${size}`,
      error && 'is-invalid',
      brand && `form-input-brand-${brand}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build container CSS classes
    const containerClasses = ['form-input-container', containerClassName]
      .filter(Boolean)
      .join(' ');

    // Build aria-describedby
    const describedByIds = [
      error && errorId,
      helperText && !error && helperId,
      ariaDescribedBy,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
            {required && <span className="text-danger ms-1" aria-label="required">*</span>}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          id={inputId}
          name={name}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel || (label ? undefined : placeholder)}
          aria-describedby={describedByIds || undefined}
          aria-invalid={error ? 'true' : undefined}
          aria-required={required ? 'true' : undefined}
          {...rest}
        />

        {error && (
          <div id={errorId} className="invalid-feedback" role="alert">
            {error}
          </div>
        )}

        {helperText && !error && (
          <div id={helperId} className="form-text">
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
