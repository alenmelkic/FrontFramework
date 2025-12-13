/**
 * FormInput Component Storybook Stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { FormInput } from './FormInput';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/FormInput',
  component: FormInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An accessible form input component with label, validation, error states, and helper text. Supports multiple input types and sizes with full WCAG 2.1 AA compliance.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'number', 'search'],
      description: 'Input type',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    brand: {
      control: 'radio',
      options: [undefined, 'energia', 'powerni'],
      description: 'Brand theme',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below input',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
  },
};

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    helperText: "We'll never share your email with anyone else.",
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

// Required Field
export const Required: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    required: true,
    helperText: 'This field is required',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    value: 'user@example.com',
    disabled: true,
  },
};

// Input Types
export const EmailInput: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'user@example.com',
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters',
  },
};

export const TelInput: Story = {
  args: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: '(123) 456-7890',
  },
};

export const NumberInput: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: 'Enter your age',
  },
};

export const UrlInput: Story = {
  args: {
    label: 'Website',
    type: 'url',
    placeholder: 'https://example.com',
  },
};

export const SearchInput: Story = {
  args: {
    label: 'Search',
    type: 'search',
    placeholder: 'Search...',
  },
};

// Sizes
export const Small: Story = {
  args: {
    label: 'Small Input',
    size: 'sm',
    placeholder: 'Small size',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Input',
    size: 'md',
    placeholder: 'Medium size (default)',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    size: 'lg',
    placeholder: 'Large size',
  },
};

// Brand Theming
export const EnergiaBrand: Story = {
  args: {
    label: 'Email Address',
    brand: 'energia',
    placeholder: 'Energia themed input',
  },
};

export const PowerNIBrand: Story = {
  args: {
    label: 'Email Address',
    brand: 'powerni',
    placeholder: 'PowerNI themed input',
  },
};

// Without Label (using aria-label)
export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Search',
    placeholder: 'Search...',
    type: 'search',
  },
};

// Form Example
export const FormExample: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <FormInput
        label="Full Name"
        placeholder="John Doe"
        required
        helperText="Enter your first and last name"
      />
      <FormInput
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        required
      />
      <FormInput
        label="Phone Number"
        type="tel"
        placeholder="(123) 456-7890"
      />
      <FormInput
        label="Website"
        type="url"
        placeholder="https://example.com"
        helperText="Optional"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Validation States
export const ValidationStates: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <FormInput
        label="Valid Email"
        type="email"
        value="user@example.com"
        helperText="Email is valid"
      />
      <FormInput
        label="Invalid Email"
        type="email"
        value="invalid-email"
        error="Please enter a valid email address"
      />
      <FormInput
        label="Required Field"
        required
        error="This field is required"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// All Sizes Comparison
export const AllSizes: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <FormInput
        label="Small"
        size="sm"
        placeholder="Small input"
      />
      <FormInput
        label="Medium"
        size="md"
        placeholder="Medium input (default)"
      />
      <FormInput
        label="Large"
        size="lg"
        placeholder="Large input"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Brand Comparison
export const BrandComparison: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <FormInput
        label="Default"
        placeholder="Default styling"
      />
      <FormInput
        label="Energia"
        brand="energia"
        placeholder="Energia themed"
      />
      <FormInput
        label="PowerNI"
        brand="powerni"
        placeholder="PowerNI themed"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Interactive
export const Interactive: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    helperText: 'Type to see the input in action',
  },
};
