/**
 * Brand Configuration
 * Define brand-specific settings, components, and output paths
 */

export interface BrandConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  outputPath: string;
  components: {
    common: string[];      // Components shared with other brands
    exclusive?: string[];  // Brand-specific components
    exclude?: string[];    // Components to exclude from this brand
  };
  theme: {
    path: string;
  };
}

export const brands: Record<string, BrandConfig> = {
  energia: {
    id: 'energia',
    name: 'Energia',
    colors: {
      primary: '#00a651',
      secondary: '#005826',
      accent: '#ffd100',
    },
    outputPath: '../../Energia.ie/Energia/wwwroot/dist',
    components: {
      common: [
        'alert',
        'button',
        'card',
        'carousel',
        'footer',
        'forminput',
        'formselect',
        'hero',
        'modal',
        'navbar',
      ],
      // exclusive: ['energia-price-calculator', 'energia-rewards'],
      // exclude: [],
    },
    theme: {
      path: '@feframework/themes/energia/bootstrap.scss',
    },
  },

  powerni: {
    id: 'powerni',
    name: 'PowerNI',
    colors: {
      primary: '#0066b3',
      secondary: '#004080',
    },
    outputPath: '../../PowerNI.ie/PowerNI/wwwroot/dist',
    components: {
      common: [
        'alert',
        'button',
        'card',
        'carousel',
        'footer',
        'forminput',
        'formselect',
        'hero',
        'modal',
        'navbar',
      ],
      // exclusive: ['powerni-tariff-comparison'],
      // exclude: ['hero'], // Example: PowerNI doesn't use hero component
    },
    theme: {
      path: '@feframework/themes/powerni/bootstrap.scss',
    },
  },
};

/**
 * Get brand configuration
 */
export function getBrandConfig(brandId: string): BrandConfig {
  const config = brands[brandId];
  if (!config) {
    throw new Error(`Brand '${brandId}' not found. Available brands: ${Object.keys(brands).join(', ')}`);
  }
  return config;
}

/**
 * Get all available brand IDs
 */
export function getAvailableBrands(): string[] {
  return Object.keys(brands);
}

/**
 * Get components to build for a specific brand
 */
export function getBrandComponents(brandId: string): string[] {
  const config = getBrandConfig(brandId);
  const components = [...config.components.common];

  // Add exclusive components if any
  if (config.components.exclusive) {
    components.push(...config.components.exclusive);
  }

  // Remove excluded components if any
  if (config.components.exclude) {
    return components.filter(c => !config.components.exclude!.includes(c));
  }

  return components;
}

/**
 * Check if a component is interactive (has JavaScript functionality)
 */
export function isInteractiveComponent(componentName: string): boolean {
  const interactiveComponents = ['modal', 'carousel', 'navbar'];
  return interactiveComponents.includes(componentName);
}
