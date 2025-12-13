import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    brandText: 'FEFramework',
    links: [
      { text: 'Home', href: '/', active: true },
      { text: 'Features', href: '/features' },
      { text: 'Pricing', href: '/pricing' },
      { text: 'About', href: '/about' },
    ],
  },
};

export const Energia: Story = {
  args: {
    ...Default.args,
    brand: 'energia',
  },
};

export const Dark: Story = {
  args: {
    ...Default.args,
    variant: 'dark',
  },
};

export const Sticky: Story = {
  args: {
    ...Default.args,
    sticky: true,
  },
};
