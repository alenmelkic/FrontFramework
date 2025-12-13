/**
 * FormSelect Component
 * Accessible dropdown select with label, validation, and error states
 */

import React, { useId } from 'react';
import { FormSelectProps } from './FormSelect.types';
import './FormSelect.bootstrap.scss';

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      size = 'md',
      brand,
      error,
      helperText,
      required = false,
      disabled = false,
      placeholder,
      value,
      onChange,
      options,
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
    const selectId = providedId || generatedId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    // Build select CSS classes
    const selectClasses = [
      'form-select',
      size !== 'md' && `form-select-${size}`,
      error && 'is-invalid',
      brand && `form-select-brand-${brand}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build container CSS classes
    const containerClasses = ['form-select-container', containerClassName]
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
          <label htmlFor={selectId} className="form-label">
            {label}
            {required && (
              <span className="text-danger ms-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          name={name}
          className={selectClasses}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel || (label ? undefined : 'Select an option')}
          aria-describedby={describedByIds || undefined}
          aria-invalid={error ? 'true' : undefined}
          aria-required={required ? 'true' : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

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

FormSelect.displayName = 'FormSelect';

export default FormSelect;
