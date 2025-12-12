/**
 * Button Component Storybook Stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component with multiple variants, sizes, and states. Fully accessible and supports both Energia and PowerNI brand theming.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
        'link',
        'outline-primary',
        'outline-secondary',
        'outline-success',
        'outline-danger',
        'outline-warning',
        'outline-info',
        'outline-light',
        'outline-dark',
      ],
      description: 'Button variant (color scheme)',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    brand: {
      control: 'radio',
      options: [undefined, 'energia', 'powerni'],
      description: 'Brand theme',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether button is in loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether button should be full width',
    },
    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset'],
      description: 'Button type attribute',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

// Variants
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    children: 'Success Button',
    variant: 'success',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning Button',
    variant: 'warning',
  },
};

export const Info: Story = {
  args: {
    children: 'Info Button',
    variant: 'info',
  },
};

export const Light: Story = {
  args: {
    children: 'Light Button',
    variant: 'light',
  },
};

export const Dark: Story = {
    args: {
    children: 'Dark Button',
    variant: 'dark',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
};

// Outline Variants
export const OutlinePrimary: Story = {
  args: {
    children: 'Outline Primary',
    variant: 'outline-primary',
  },
};

export const OutlineSecondary: Story = {
  args: {
    children: 'Outline Secondary',
    variant: 'outline-secondary',
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// States
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// Brand Theming
export const EnergiaBrand: Story = {
  args: {
    children: 'Energia Button',
    brand: 'energia',
    variant: 'primary',
  },
};

export const PowerNIBrand: Story = {
  args: {
    children: 'PowerNI Button',
    brand: 'powerni',
    variant: 'primary',
  },
};

// Brand Comparison
export const BrandComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="primary">Default Primary</Button>
        <Button variant="primary" brand="energia">
          Energia Primary
        </Button>
        <Button variant="primary" brand="powerni">
          PowerNI Primary
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="outline-primary">Default Outline</Button>
        <Button variant="outline-primary" brand="energia">
          Energia Outline
        </Button>
        <Button variant="outline-primary" brand="powerni">
          PowerNI Outline
        </Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="info">Info</Button>
      <Button variant="light">Light</Button>
      <Button variant="dark">Dark</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// All Sizes Showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// Interactive Example
export const Interactive: Story = {
  args: {
    children: 'Click Me!',
    variant: 'primary',
  },
};

// Button Types
export const SubmitButton: Story = {
  args: {
    children: 'Submit',
    type: 'submit',
    variant: 'success',
  },
};

export const ResetButton: Story = {
  args: {
    children: 'Reset',
    type: 'reset',
    variant: 'secondary',
  },
};

// Complex Example with Icon (using emoji for now)
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span style={{ marginRight: '0.5rem' }}>✓</span>
        Save Changes
      </>
    ),
    variant: 'success',
  },
};

// Accessibility Example
export const WithAriaLabel: Story = {
  args: {
    children: '×',
    variant: 'danger',
    'aria-label': 'Close dialog',
    size: 'sm',
  },
};
