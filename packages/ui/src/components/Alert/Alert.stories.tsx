/**
 * Alert Component Storybook Stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An accessible notification banner component with multiple variants, dismissible option, and support for icons and headings. Fully WCAG 2.1 AA compliant.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: 'Alert variant (color scheme)',
    },
    brand: {
      control: 'radio',
      options: [undefined, 'energia', 'powerni'],
      description: 'Brand theme',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
    heading: {
      control: 'text',
      description: 'Alert heading/title',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show default icon for variant',
    },
    role: {
      control: 'radio',
      options: ['alert', 'status'],
      description: 'ARIA role',
    },
    children: {
      control: 'text',
      description: 'Alert content',
    },
  },
  args: {
    onDismiss: fn(),
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  args: {
    children: 'This is an informational alert message.',
  },
};

// Variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'This is a primary alert message.',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'This is a secondary alert message.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Your changes have been saved successfully!',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'An error occurred while processing your request.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Please review your information before submitting.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an informational message for your reference.',
  },
};

export const Light: Story = {
  args: {
    variant: 'light',
    children: 'This is a light alert message.',
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: 'This is a dark alert message.',
  },
};

// With Heading
export const WithHeading: Story = {
  args: {
    variant: 'success',
    heading: 'Well done!',
    children: 'You successfully read this important alert message.',
  },
};

// Dismissible
export const Dismissible: Story = {
  args: {
    variant: 'warning',
    dismissible: true,
    children: 'This alert can be dismissed by clicking the close button.',
  },
};

// With Icon
export const WithIcon: Story = {
  args: {
    variant: 'success',
    showIcon: true,
    children: 'Your payment has been processed successfully!',
  },
};

export const WithIconAndHeading: Story = {
  args: {
    variant: 'info',
    showIcon: true,
    heading: 'Did you know?',
    children: 'You can customize your notification preferences in settings.',
  },
};

// Custom Icon
export const CustomIcon: Story = {
  args: {
    variant: 'warning',
    icon: <span style={{ fontSize: '1.5rem' }}>⚡</span>,
    heading: 'Power Usage Alert',
    children: 'Your energy consumption is higher than usual this month.',
  },
};

// Brand Theming
export const EnergiaBrand: Story = {
  args: {
    variant: 'primary',
    brand: 'energia',
    heading: 'Energia Alert',
    children: 'This alert uses Energia brand colors.',
  },
};

export const PowerNIBrand: Story = {
  args: {
    variant: 'primary',
    brand: 'powerni',
    heading: 'PowerNI Alert',
    children: 'This alert uses PowerNI brand colors.',
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="primary">Primary alert message</Alert>
      <Alert variant="secondary">Secondary alert message</Alert>
      <Alert variant="success">Success alert message</Alert>
      <Alert variant="danger">Danger alert message</Alert>
      <Alert variant="warning">Warning alert message</Alert>
      <Alert variant="info">Info alert message</Alert>
      <Alert variant="light">Light alert message</Alert>
      <Alert variant="dark">Dark alert message</Alert>
    </div>
  ),
};

// Dismissible Variants
export const DismissibleVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="success" dismissible>
        Dismissible success alert
      </Alert>
      <Alert variant="danger" dismissible>
        Dismissible danger alert
      </Alert>
      <Alert variant="warning" dismissible>
        Dismissible warning alert
      </Alert>
      <Alert variant="info" dismissible>
        Dismissible info alert
      </Alert>
    </div>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="success" showIcon>
        Success - Operation completed successfully
      </Alert>
      <Alert variant="danger" showIcon>
        Error - Something went wrong
      </Alert>
      <Alert variant="warning" showIcon>
        Warning - Please proceed with caution
      </Alert>
      <Alert variant="info" showIcon>
        Info - Here's some useful information
      </Alert>
    </div>
  ),
};

// Complex Example
export const ComplexExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="success" heading="Payment Successful" showIcon dismissible>
        Your payment of €45.50 has been processed successfully. A confirmation email has been
        sent to your registered email address.
      </Alert>

      <Alert variant="warning" heading="Account Expiring Soon" showIcon>
        Your account will expire in 7 days. Please renew your subscription to continue enjoying
        our services.
      </Alert>

      <Alert variant="danger" heading="Action Required" showIcon dismissible>
        We noticed unusual activity on your account. Please verify your recent transactions or
        contact support immediately.
      </Alert>

      <Alert variant="info" heading="System Maintenance" showIcon>
        Scheduled maintenance will occur on Sunday, 3:00 AM - 5:00 AM GMT. Some services may
        be temporarily unavailable.
      </Alert>
    </div>
  ),
};

// Brand Comparison
export const BrandComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="primary" heading="Default Theme">
        This alert uses the default Bootstrap theme colors.
      </Alert>
      <Alert variant="primary" brand="energia" heading="Energia Theme">
        This alert uses Energia brand colors for a consistent brand experience.
      </Alert>
      <Alert variant="primary" brand="powerni" heading="PowerNI Theme">
        This alert uses PowerNI brand colors for a consistent brand experience.
      </Alert>
    </div>
  ),
};

// Status Role
export const StatusRole: Story = {
  args: {
    role: 'status',
    variant: 'info',
    children: 'Your changes are being saved...',
  },
};

// Accessibility Example
export const WithAriaLabel: Story = {
  args: {
    variant: 'danger',
    'aria-label': 'Critical system error notification',
    heading: 'System Error',
    children: 'A critical error has occurred. Please contact system administrator.',
  },
};
