/**
 * Navbar Component
 * Accessible navigation bar with mobile toggle and keyboard navigation
 */

import React, { useState } from 'react';
import { NavbarProps } from './Navbar.types';
import './Navbar.bootstrap.scss';

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      brandText,
      brandImage,
      brandHref = '/',
      links = [],
      brand,
      className = '',
      variant = 'light',
      sticky = false,
      children,
      ...rest
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleNav = () => {
      setIsExpanded(!isExpanded);
    };

    const closeNav = () => {
      setIsExpanded(false);
    };

    // Build CSS classes
    const classes = [
      'navbar',
      'navbar-expand-lg',
      variant === 'dark' ? 'navbar-dark' : 'navbar-light',
      sticky && 'sticky-top',
      brand && `navbar-brand-${brand}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <nav className={classes} ref={ref} {...rest}>
        <div className="container-fluid">
          {/* Brand */}
          <a className="navbar-brand" href={brandHref}>
            {brandImage && (
              <img
                src={brandImage}
                alt={brandText || 'Brand logo'}
                height="30"
                className="d-inline-block align-text-top"
              />
            )}
            {brandText && <span className="navbar-brand-text">{brandText}</span>}
          </a>

          {/* Mobile toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNav}
            aria-expanded={isExpanded}
            aria-controls="navbarNav"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation links */}
          <div
            className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              {links.map((link, index) => (
                <li key={index} className="nav-item">
                  <a
                    className={`nav-link ${link.active ? 'active' : ''}`}
                    href={link.href}
                    target={link.target}
                    rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                    aria-current={link.active ? 'page' : undefined}
                    onClick={closeNav}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>

            {/* Additional content */}
            {children && <div className="navbar-extra">{children}</div>}
          </div>
        </div>
      </nav>
    );
  }
);

Navbar.displayName = 'Navbar';

export default Navbar;
