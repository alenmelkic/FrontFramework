/**
 * Card Component
 * Accessible content card with image, header, body, and footer support
 */

import React from 'react';
import { CardProps } from './Card.types';
import './Card.bootstrap.scss';

export const Card = React.forwardRef<HTMLElement, CardProps>(
  (
    {
      header,
      body,
      footer,
      image,
      imageAlt,
      imagePosition = 'top',
      href,
      brand,
      className = '',
      children,
      target,
      rel,
      'aria-label': ariaLabel,
      bordered = true,
      textAlign,
      ...rest
    },
    ref
  ) => {
    // Validate image alt text
    if (image && !imageAlt) {
      console.warn('Card: imageAlt is required when image is provided for accessibility');
    }

    // Build CSS classes
    const classes = [
      'card',
      !bordered && 'border-0',
      brand && `card-brand-${brand}`,
      href && 'card-clickable',
      textAlign && `text-${textAlign}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Determine if using structured layout or children
    const hasStructuredContent = header || body || footer;

    // Build card content
    const cardContent = (
      <>
        {image && imagePosition === 'top' && (
          <img src={image} className="card-img-top" alt={imageAlt || ''} loading="lazy" />
        )}

        {hasStructuredContent ? (
          <>
            {header && <div className="card-header">{header}</div>}

            {body && <div className="card-body">{body}</div>}

            {footer && <div className="card-footer">{footer}</div>}
          </>
        ) : (
          children && <div className="card-body">{children}</div>
        )}

        {image && imagePosition === 'bottom' && (
          <img src={image} className="card-img-bottom" alt={imageAlt || ''} loading="lazy" />
        )}
      </>
    );

    // If href is provided, wrap in anchor tag
    if (href) {
      return (
        <a
          href={href}
          className={classes}
          target={target}
          rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
          aria-label={ariaLabel}
          {...rest}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {cardContent}
        </a>
      );
    }

    // Otherwise, use article element
    return (
      <article className={classes} aria-label={ariaLabel} {...rest} ref={ref as React.Ref<HTMLElement>}>
        {cardContent}
      </article>
    );
  }
);

Card.displayName = 'Card';

export default Card;
