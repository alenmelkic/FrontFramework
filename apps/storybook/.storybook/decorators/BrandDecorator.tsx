import React, { useEffect } from 'react';
import type { Decorator } from '@storybook/react';

/**
 * Brand Decorator
 * Switches CSS theme based on selected brand from toolbar
 */
export const BrandDecorator: Decorator = (Story, context) => {
  const brand = context.globals.brand || 'energia';

  useEffect(() => {
    // Store brand preference
    localStorage.setItem('storybook-brand', brand);

    // Remove any existing brand CSS links
    const existingLinks = document.querySelectorAll('link[data-brand-theme]');
    existingLinks.forEach((link) => link.remove());

    // Add new brand CSS link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/themes/${brand}/bootstrap.css`;
    link.setAttribute('data-brand-theme', brand);
    document.head.appendChild(link);

    // Update body class for brand-specific styles
    document.body.className = document.body.className
      .replace(/brand-\w+/g, '')
      .trim();
    document.body.classList.add(`brand-${brand}`);
  }, [brand]);

  return (
    <div className={`storybook-wrapper brand-${brand}`} data-brand={brand}>
      <Story />
    </div>
  );
};
