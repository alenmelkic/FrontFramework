/**
 * Hero Component
 * Full-width hero section with background, overlay, and call-to-action buttons
 */

import React from 'react';
import { HeroProps } from './Hero.types';
import './Hero.bootstrap.scss';

export const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      title,
      subtitle,
      backgroundImage,
      overlayOpacity = 0.5,
      primaryAction,
      secondaryAction,
      brand,
      className = '',
      height = 'medium',
      align = 'center',
      textColor = 'light',
      ...rest
    },
    ref
  ) => {
    // Build CSS classes
    const classes = [
      'hero',
      `hero-${height}`,
      `hero-align-${align}`,
      `hero-text-${textColor}`,
      brand && `hero-brand-${brand}`,
      backgroundImage && 'hero-with-background',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build overlay style
    const overlayStyle = backgroundImage
      ? { backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }
      : undefined;

    // Build background style
    const backgroundStyle = backgroundImage
      ? { backgroundImage: `url(${backgroundImage})` }
      : undefined;

    const renderAction = (action: HeroProps['primaryAction'], isPrimary: boolean) => {
      if (!action) return null;

      const buttonVariant = action.variant || (isPrimary ? 'primary' : 'secondary');
      const buttonClass = `btn btn-${buttonVariant} btn-lg`;

      if (action.href) {
        return (
          <a
            href={action.href}
            className={buttonClass}
            target={action.target}
            rel={action.target === '_blank' ? 'noopener noreferrer' : undefined}
          >
            {action.text}
          </a>
        );
      }

      return (
        <button type="button" className={buttonClass} onClick={action.onClick}>
          {action.text}
        </button>
      );
    };

    return (
      <section className={classes} style={backgroundStyle} ref={ref} {...rest}>
        {backgroundImage && <div className="hero-overlay" style={overlayStyle} />}

        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>

          {subtitle && <p className="hero-subtitle">{subtitle}</p>}

          {(primaryAction || secondaryAction) && (
            <div className="hero-actions">
              {renderAction(primaryAction, true)}
              {renderAction(secondaryAction, false)}
            </div>
          )}
        </div>
      </section>
    );
  }
);

Hero.displayName = 'Hero';

export default Hero;
