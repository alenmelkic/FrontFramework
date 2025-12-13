/**
 * Modal Component
 * Accessible modal dialog with focus trap and backdrop
 */

import React, { useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from './Modal.types';
import { createFocusTrap } from '../../a11y/focus-trap';
import './Modal.bootstrap.scss';

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      size = 'md',
      showCloseButton = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      brand,
      children,
      className = '',
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...rest
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const titleId = useId();

    // Handle escape key
    useEffect(() => {
      if (!isOpen || !closeOnEscape) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeOnEscape, onClose]);

    // Handle focus trap
    useEffect(() => {
      if (!isOpen || !modalRef.current) return;

      const cleanup = createFocusTrap(modalRef.current);
      return cleanup;
    }, [isOpen]);

    // Prevent body scroll when modal is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
      }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    // Build CSS classes
    const dialogClasses = [
      'modal-dialog',
      `modal-${size}`,
      brand && `modal-brand-${brand}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const modalContent = (
      <div
        className="modal fade show"
        style={{ display: 'block' }}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy || (title ? titleId : undefined)}
        onClick={handleBackdropClick}
      >
        <div className={dialogClasses} ref={modalRef} {...rest}>
          <div className="modal-content">
            {(title || showCloseButton) && (
              <div className="modal-header">
                {title && (
                  <h2 className="modal-title" id={titleId}>
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    type="button"
                    className="btn-close"
                    onClick={onClose}
                    aria-label="Close modal"
                  />
                )}
              </div>
            )}

            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    );

    // Render backdrop
    const backdrop = <div className="modal-backdrop fade show" />;

    // Use portal to render at document body level
    return createPortal(
      <>
        {backdrop}
        {modalContent}
      </>,
      document.body
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
