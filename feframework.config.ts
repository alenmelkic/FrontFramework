export interface FEFrameworkConfig {
  cssFramework: 'bootstrap';
  version: {
    bootstrap: string;
  };
  brand: string;
  purgecss: {
    enabled: boolean;
    safelist: string[];
  };
  a11y: {
    enforceStandards: 'WCAG2.1-AA' | 'WCAG2.1-AAA';
    autoFocusManagement: boolean;
  };
}

export const energiaConfig: FEFrameworkConfig = {
  cssFramework: 'bootstrap',
  version: {
    bootstrap: '5.3.8',
  },
  brand: 'energia',
  purgecss: {
    enabled: true,
    safelist: [
      // Swiper classes
      /^swiper/,
      // Bootstrap component classes
      /^btn/,
      /^form/,
      /^nav/,
      /^alert/,
      /^card/,
      /^modal/,
      /^dropdown/,
      // Accessibility utilities
      'sr-only',
      'visually-hidden',
      'focus-visible',
      'skip-link',
      // State classes
      'active',
      'show',
      'fade',
      'disabled',
      // ARIA and data attributes
      /^aria-/,
      /^data-/,
    ],
  },
  a11y: {
    enforceStandards: 'WCAG2.1-AA',
    autoFocusManagement: true,
  },
};

export const powerniConfig: FEFrameworkConfig = {
  cssFramework: 'bootstrap',
  version: {
    bootstrap: '5.3.8',
  },
  brand: 'powerni',
  purgecss: {
    enabled: true,
    safelist: [
      // Swiper classes
      /^swiper/,
      // Bootstrap component classes
      /^btn/,
      /^form/,
      /^nav/,
      /^alert/,
      /^card/,
      /^modal/,
      /^dropdown/,
      // Accessibility utilities
      'sr-only',
      'visually-hidden',
      'focus-visible',
      'skip-link',
      // State classes
      'active',
      'show',
      'fade',
      'disabled',
      // ARIA and data attributes
      /^aria-/,
      /^data-/,
    ],
  },
  a11y: {
    enforceStandards: 'WCAG2.1-AA',
    autoFocusManagement: true,
  },
};

export function validateConfig(config: FEFrameworkConfig): boolean {
  if (!config.cssFramework || config.cssFramework !== 'bootstrap') {
    throw new Error('cssFramework must be "bootstrap"');
  }
  if (!config.version?.bootstrap) {
    throw new Error('Bootstrap version is required');
  }
  if (!config.brand) {
    throw new Error('Brand is required');
  }
  if (!['WCAG2.1-AA', 'WCAG2.1-AAA'].includes(config.a11y.enforceStandards)) {
    throw new Error('Invalid accessibility standard');
  }
  return true;
}
