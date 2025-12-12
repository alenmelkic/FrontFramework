/**
 * Test Utilities
 * Custom render function with providers and utilities
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Brand context type
export type Brand = 'energia' | 'powerni';

interface TestProvidersProps {
  children: React.ReactNode;
  brand?: Brand;
}

/**
 * Test providers wrapper
 * Add any global providers here (theme, router, etc.)
 */
function TestProviders({ children, brand = 'energia' }: TestProvidersProps) {
  // Add brand class to wrapper for theme testing
  return (
    <div className={`test-wrapper brand-${brand}`} data-testid="test-wrapper">
      {children}
    </div>
  );
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  brand?: Brand;
}

/**
 * Custom render function with test providers
 */
function customRender(ui: ReactElement, options?: CustomRenderOptions) {
  const { brand, ...renderOptions } = options || {};

  return render(ui, {
    wrapper: ({ children }) => <TestProviders brand={brand}>{children}</TestProviders>,
    ...renderOptions,
  });
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react';

// Override render with our custom version
export { customRender as render };
