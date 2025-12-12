/**
 * Button Component
 * Accessible, multi-variant button with loading state support
 */

import React from 'react';
import { ButtonProps } from './Button.types';
import './Button.bootstrap.scss';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      brand,
      disabled = false,
      loading = false,
      type = 'button',
      fullWidth = false,
      children,
      className = '',
      onClick,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    // Build CSS classes
    const classes = [
      'btn',
      `btn-${variant}`,
      size !== 'md' && `btn-${size}`,
      fullWidth && 'w-100',
      brand && `btn-brand-${brand}`,
      loading && 'btn-loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Handle click - prevent if disabled or loading
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    // Determine actual disabled state
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={isDisabled}
        onClick={handleClick}
        aria-label={ariaLabel}
        {...(isDisabled && { 'aria-disabled': 'true' })}
        {...(loading && { 'aria-busy': 'true' })}
        {...rest}
      >
        {loading && (
          <span
            className="btn-spinner spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          >
            <span className="visually-hidden">Loading...</span>
          </span>
        )}
        <span className={loading ? 'btn-content-loading' : 'btn-content'}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
