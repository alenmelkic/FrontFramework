import type { Preview } from '@storybook/react';
import { BrandDecorator } from './decorators/BrandDecorator';

const preview: Preview = {
  decorators: [BrandDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa'],
        },
      },
    },
    layout: 'padded',
  },
  globalTypes: {
    brand: {
      description: 'Brand theme',
      defaultValue: 'energia',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'energia', title: 'Energia', icon: 'circlehollow' },
          { value: 'powerni', title: 'PowerNI', icon: 'circle' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
