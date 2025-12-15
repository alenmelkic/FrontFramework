import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../../../packages/ui/src/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@feframework/ui': path.resolve(__dirname, '../../packages/ui/src'),
          '@tests': path.resolve(__dirname, '../../tests'),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            includePaths: [
              path.resolve(__dirname, '../../node_modules'),
              path.resolve(__dirname, '../../packages/ui/src'),
            ],
            additionalData: `
              @import "bootstrap/scss/functions";
              @import "bootstrap/scss/variables";
              @import "bootstrap/scss/mixins";
            `,
          },
        },
      },
      optimizeDeps: {
        include: ['react', 'react-dom', 'bootstrap', '@popperjs/core', '@storybook/test'],
      },
    };
  },
};

export default config;
