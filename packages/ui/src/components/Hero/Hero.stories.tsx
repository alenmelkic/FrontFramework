/**
 * Hero Component Storybook Stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A full-width hero section component with background image support, overlay, call-to-action buttons, and brand theming. Perfect for landing pages and feature sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Hero title (h1)',
    },
    subtitle: {
      control: 'text',
      description: 'Hero subtitle/description',
    },
    backgroundImage: {
      control: 'text',
      description: 'Background image URL',
    },
    overlayOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Overlay opacity (0-1)',
    },
    height: {
      control: 'radio',
      options: ['small', 'medium', 'large', 'full'],
      description: 'Hero height',
    },
    align: {
      control: 'radio',
      options: ['start', 'center', 'end'],
      description: 'Content alignment',
    },
    textColor: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Text color',
    },
    brand: {
      control: 'radio',
      options: [undefined, 'energia', 'powerni'],
      description: 'Brand theme',
    },
  },
  args: {
    primaryAction: { onClick: fn() },
    secondaryAction: { onClick: fn() },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    title: 'Welcome to FEFramework',
    subtitle: 'Build beautiful, accessible user interfaces with ease',
  },
};

// With Actions
export const WithActions: Story = {
  args: {
    title: 'Get Started Today',
    subtitle: 'Join thousands of developers building amazing applications',
    primaryAction: { text: 'Get Started', onClick: fn() },
    secondaryAction: { text: 'Learn More', onClick: fn() },
  },
};

// With Background
export const WithBackground: Story = {
  args: {
    title: 'Beautiful Experiences',
    subtitle: 'Create stunning user interfaces that delight your users',
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920',
    primaryAction: { text: 'Explore Features', onClick: fn() },
    secondaryAction: { text: 'View Demo', onClick: fn() },
  },
};

// Custom Overlay
export const CustomOverlay: Story = {
  args: {
    title: 'Lighter Overlay',
    subtitle: 'Adjust the overlay opacity to control image visibility',
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920',
    overlayOpacity: 0.3,
    primaryAction: { text: 'Get Started', onClick: fn() },
  },
};

// Height Variants
export const SmallHeight: Story = {
  args: {
    title: 'Small Hero',
    subtitle: 'Perfect for secondary pages',
    height: 'small',
    primaryAction: { text: 'Learn More', onClick: fn() },
  },
};

export const MediumHeight: Story = {
  args: {
    title: 'Medium Hero',
    subtitle: 'The default height option',
    height: 'medium',
    primaryAction: { text: 'Get Started', onClick: fn() },
  },
};

export const LargeHeight: Story = {
  args: {
    title: 'Large Hero',
    subtitle: 'Make a big impression',
    height: 'large',
    primaryAction: { text: 'Explore', onClick: fn() },
  },
};

export const FullHeight: Story = {
  args: {
    title: 'Full Screen Hero',
    subtitle: 'Takes up the entire viewport height',
    height: 'full',
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920',
    primaryAction: { text: 'Scroll Down', onClick: fn() },
  },
};

// Alignment
export const AlignStart: Story = {
  args: {
    title: 'Left Aligned',
    subtitle: 'Content aligned to the left',
    align: 'start',
    primaryAction: { text: 'Get Started', onClick: fn() },
  },
};

export const AlignEnd: Story = {
  args: {
    title: 'Right Aligned',
    subtitle: 'Content aligned to the right',
    align: 'end',
    primaryAction: { text: 'Learn More', onClick: fn() },
  },
};

// Text Color
export const DarkText: Story = {
  args: {
    title: 'Dark Text on Light Background',
    subtitle: 'Better contrast for light backgrounds',
    textColor: 'dark',
    primaryAction: { text: 'Get Started', onClick: fn() },
  },
};

// Brand Theming
export const EnergiaBrand: Story = {
  args: {
    title: 'Energia Solutions',
    subtitle: 'Powering Ireland with sustainable energy',
    brand: 'energia',
    primaryAction: { text: 'Get Started', href: '#' },
    secondaryAction: { text: 'Learn More', href: '#' },
  },
};

export const PowerNIBrand: Story = {
  args: {
    title: 'PowerNI Services',
    subtitle: 'Reliable energy for Northern Ireland',
    brand: 'powerni',
    primaryAction: { text: 'Get Started', href: '#' },
    secondaryAction: { text: 'Learn More', href: '#' },
  },
};

// Link Actions
export const WithLinks: Story = {
  args: {
    title: 'Explore Our Platform',
    subtitle: 'Click the buttons to navigate',
    primaryAction: { text: 'Documentation', href: '/docs' },
    secondaryAction: { text: 'GitHub', href: 'https://github.com', target: '_blank' },
  },
};

// Single Action
export const SingleAction: Story = {
  args: {
    title: 'Simple Call to Action',
    subtitle: 'One clear action for users to take',
    primaryAction: { text: 'Get Started Free', onClick: fn() },
  },
};

// Complex Example
export const LandingPage: Story = {
  args: {
    title: 'Transform Your Energy Management',
    subtitle: 'Monitor, analyze, and optimize your energy consumption with our cutting-edge platform',
    backgroundImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920',
    overlayOpacity: 0.6,
    height: 'large',
    brand: 'energia',
    primaryAction: { text: 'Start Free Trial', onClick: fn() },
    secondaryAction: { text: 'Watch Demo', onClick: fn() },
  },
};

// Product Launch
export const ProductLaunch: Story = {
  args: {
    title: 'Introducing Smart Energy 2.0',
    subtitle: 'The future of energy management is here. Experience unprecedented control and insights.',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920',
    height: 'full',
    brand: 'powerni',
    primaryAction: { text: 'Pre-Order Now', variant: 'primary', onClick: fn() },
    secondaryAction: { text: 'Learn More', variant: 'outline-primary', onClick: fn() },
  },
};

// Minimal
export const Minimal: Story = {
  args: {
    title: 'Simple & Clean',
    subtitle: 'Sometimes less is more',
    height: 'small',
  },
};
