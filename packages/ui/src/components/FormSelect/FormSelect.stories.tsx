/**
 * FormSelect Component Storybook Stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { FormSelect } from './FormSelect';
import { fn } from '@storybook/test';
import { FormSelectOption } from './FormSelect.types';

const countryOptions: FormSelectOption[] = [
  { value: 'ie', label: 'Ireland' },
  { value: 'ni', label: 'Northern Ireland' },
  { value: 'gb', label: 'Great Britain' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
];

const meta = {
  title: 'Components/FormSelect',
  component: FormSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An accessible dropdown select component with label, validation, error states, and helper text. Supports multiple sizes with full WCAG 2.1 AA compliance.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the select',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Select size',
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
      description: 'Helper text to display below select',
    },
    required: {
      control: 'boolean',
      description: 'Whether the select is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text (shown as first disabled option)',
    },
  },
  args: {
    onChange: fn(),
    options: countryOptions,
  },
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
  },
};

// With Placeholder
export const WithPlaceholder: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
  },
};

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    helperText: 'Choose the country where you reside',
    options: countryOptions,
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    value: '',
    error: 'Please select a country',
    options: countryOptions,
  },
};

// Required Field
export const Required: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    required: true,
    helperText: 'This field is required',
    options: countryOptions,
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Country',
    value: 'ie',
    disabled: true,
    options: countryOptions,
  },
};

// Disabled Options
export const WithDisabledOptions: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: [
      { value: 'ie', label: 'Ireland' },
      { value: 'ni', label: 'Northern Ireland' },
      { value: 'gb', label: 'Great Britain (Unavailable)', disabled: true },
      { value: 'us', label: 'United States (Unavailable)', disabled: true },
      { value: 'ca', label: 'Canada' },
    ],
  },
};

// Sizes
export const Small: Story = {
  args: {
    label: 'Country',
    size: 'sm',
    placeholder: 'Select a country',
    options: countryOptions,
  },
};

export const Medium: Story = {
  args: {
    label: 'Country',
    size: 'md',
    placeholder: 'Select a country',
    options: countryOptions,
  },
};

export const Large: Story = {
  args: {
    label: 'Country',
    size: 'lg',
    placeholder: 'Select a country',
    options: countryOptions,
  },
};

// Brand Theming
export const EnergiaBrand: Story = {
  args: {
    label: 'Country',
    brand: 'energia',
    placeholder: 'Energia themed select',
    options: countryOptions,
  },
};

export const PowerNIBrand: Story = {
  args: {
    label: 'Country',
    brand: 'powerni',
    placeholder: 'PowerNI themed select',
    options: countryOptions,
  },
};

// Without Label (using aria-label)
export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Country selector',
    placeholder: 'Select a country',
    options: countryOptions,
  },
};

// Numeric Values
export const WithNumericValues: Story = {
  args: {
    label: 'Rating',
    placeholder: 'Select a rating',
    options: [
      { value: 1, label: '1 Star' },
      { value: 2, label: '2 Stars' },
      { value: 3, label: '3 Stars' },
      { value: 4, label: '4 Stars' },
      { value: 5, label: '5 Stars' },
    ],
  },
};

// Form Example
export const FormExample: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <FormSelect
        label="Country"
        placeholder="Select a country"
        required
        options={countryOptions}
      />
      <FormSelect
        label="Preferred Contact Method"
        placeholder="Select a method"
        options={[
          { value: 'email', label: 'Email' },
          { value: 'phone', label: 'Phone' },
          { value: 'sms', label: 'SMS' },
        ]}
      />
      <FormSelect
        label="Newsletter Frequency"
        placeholder="Select frequency"
        helperText="How often would you like to receive updates?"
        options={[
          { value: 'daily', label: 'Daily' },
          { value: 'weekly', label: 'Weekly' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'never', label: 'Never' },
        ]}
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
      <FormSelect
        label="Valid Selection"
        value="ie"
        helperText="Selection is valid"
        options={countryOptions}
      />
      <FormSelect
        label="Invalid Selection"
        value=""
        error="Please select a country"
        options={countryOptions}
      />
      <FormSelect
        label="Required Field"
        required
        error="This field is required"
        placeholder="Select a country"
        options={countryOptions}
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
      <FormSelect
        label="Small"
        size="sm"
        placeholder="Small select"
        options={countryOptions}
      />
      <FormSelect
        label="Medium"
        size="md"
        placeholder="Medium select (default)"
        options={countryOptions}
      />
      <FormSelect
        label="Large"
        size="lg"
        placeholder="Large select"
        options={countryOptions}
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
      <FormSelect
        label="Default"
        placeholder="Default styling"
        options={countryOptions}
      />
      <FormSelect
        label="Energia"
        brand="energia"
        placeholder="Energia themed"
        options={countryOptions}
      />
      <FormSelect
        label="PowerNI"
        brand="powerni"
        placeholder="PowerNI themed"
        options={countryOptions}
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
    label: 'Country',
    placeholder: 'Select a country',
    helperText: 'Choose an option to see it in action',
    options: countryOptions,
  },
};
