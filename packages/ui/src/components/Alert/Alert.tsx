/**
 * Alert Component
 * Accessible notification banner with variants and dismissible option
 */

import React, { useState } from 'react';
import { AlertProps } from './Alert.types';
import './Alert.bootstrap.scss';

const getDefaultIcon = (variant: AlertProps['variant']): string => {
  switch (variant) {
    case 'success':
      return '✓';
    case 'danger':
      return '✕';
    case 'warning':
      return '⚠';
    case 'info':
      return 'ℹ';
    default:
      return '';
  }
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      brand,
      dismissible = false,
      onDismiss,
      heading,
      children,
      className = '',
      role = 'alert',
      'aria-label': ariaLabel,
      icon,
      showIcon = false,
      ...rest
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    // Don't render if dismissed
    if (!isVisible) {
      return null;
    }

    // Build CSS classes
    const classes = [
      'alert',
      `alert-${variant}`,
      dismissible && 'alert-dismissible fade show',
      brand && `alert-brand-${brand}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Determine icon to show
    const displayIcon = icon || (showIcon && getDefaultIcon(variant));

    return (
      <div
        ref={ref}
        className={classes}
        role={role}
        aria-label={ariaLabel}
        aria-live={role === 'alert' ? 'assertive' : 'polite'}
        aria-atomic="true"
        {...rest}
      >
        <div className="alert-content">
          {displayIcon && <span className="alert-icon" aria-hidden="true">{displayIcon}</span>}

          <div className="alert-body">
            {heading && <h4 className="alert-heading">{heading}</h4>}
            <div className="alert-message">{children}</div>
          </div>
        </div>

        {dismissible && (
          <button
            type="button"
            className="btn-close"
            onClick={handleDismiss}
            aria-label="Close alert"
          />
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
