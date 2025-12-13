/**
 * Footer Component Storybook Stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sections: [
      {
        title: 'Product',
        links: [
          { text: 'Features', href: '#' },
          { text: 'Pricing', href: '#' },
        ],
      },
    ],
    copyright: '© 2025 Company. All rights reserved.',
  },
};

export const WithSocial: Story = {
  args: {
    ...Default.args,
    socialLinks: [
      { text: 'FB', href: 'https://facebook.com' },
      { text: 'TW', href: 'https://twitter.com' },
    ],
  },
};

export const Energia: Story = {
  args: {
    ...Default.args,
    brand: 'energia',
  },
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    copyright: '© 2025 Company',
  },
};
