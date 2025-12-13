/**
 * Footer Component
 * Accessible footer with links, sections, and copyright information
 */

import React from 'react';
import { FooterProps } from './Footer.types';
import './Footer.bootstrap.scss';

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      sections = [],
      copyright,
      socialLinks = [],
      brand,
      className = '',
      variant = 'default',
      ...rest
    },
    ref
  ) => {
    // Build CSS classes
    const classes = [
      'footer',
      `footer-${variant}`,
      brand && `footer-brand-${brand}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const currentYear = new Date().getFullYear();
    const copyrightText = copyright || `© ${currentYear}. All rights reserved.`;

    return (
      <footer className={classes} ref={ref} {...rest}>
        {variant === 'default' && sections.length > 0 && (
          <div className="footer-sections">
            <div className="container">
              <div className="row">
                {sections.map((section, index) => (
                  <div key={index} className="col-12 col-md-6 col-lg-3 footer-section">
                    <h3 className="footer-section-title">{section.title}</h3>
                    <ul className="footer-links">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            target={link.target}
                            rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                          >
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-content">
              <p className="footer-copyright">{copyrightText}</p>

              {socialLinks.length > 0 && (
                <div className="footer-social">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target={link.target || '_blank'}
                      rel="noopener noreferrer"
                      aria-label={link.text}
                      className="footer-social-link"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

export default Footer;
