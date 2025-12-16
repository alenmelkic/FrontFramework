/**
 * Card Component Storybook Stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible content card component with support for images, headers, footers, and clickable cards. Fully accessible with WCAG 2.1 AA compliance.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: 'text',
      description: 'Card header content',
    },
    body: {
      control: 'text',
      description: 'Card body content',
    },
    footer: {
      control: 'text',
      description: 'Card footer content',
    },
    image: {
      control: 'text',
      description: 'Image URL',
    },
    imageAlt: {
      control: 'text',
      description: 'Image alt text (required if image provided)',
    },
    imagePosition: {
      control: 'radio',
      options: ['top', 'bottom'],
      description: 'Image position',
    },
    href: {
      control: 'text',
      description: 'Link URL (makes card clickable)',
    },
    brand: {
      control: 'radio',
      options: [undefined, 'energia', 'powerni'],
      description: 'Brand theme',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether card has border',
    },
    textAlign: {
      control: 'radio',
      options: [undefined, 'start', 'center', 'end'],
      description: 'Text alignment',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  args: {
    body: 'This is a simple card with just body content.',
  },
};

// With Header, Body, and Footer
export const Complete: Story = {
  args: {
    header: 'Card Header',
    body: 'This card has a header, body, and footer. Perfect for structured content.',
    footer: 'Card Footer',
  },
};

// With Image
export const WithImage: Story = {
  args: {
    image: 'https://via.placeholder.com/400x225',
    imageAlt: 'Placeholder image',
    header: 'Beautiful Landscape',
    body: 'This card features an image at the top, followed by header and body content.',
  },
};

// Image at Bottom
export const ImageBottom: Story = {
  args: {
    header: 'Title First',
    body: 'The image appears at the bottom of this card.',
    image: 'https://via.placeholder.com/400x225',
    imageAlt: 'Placeholder image',
    imagePosition: 'bottom',
  },
};

// Clickable Card
export const Clickable: Story = {
  args: {
    href: '#',
    image: 'https://via.placeholder.com/400x225',
    imageAlt: 'Product image',
    header: 'Product Name',
    body: 'Click anywhere on this card to navigate. Hover to see the effect.',
    footer: '€29.99',
  },
};

// External Link
export const ExternalLink: Story = {
  args: {
    href: 'https://example.com',
    target: '_blank',
    header: 'External Resource',
    body: 'This card links to an external website and opens in a new tab.',
  },
};

// Brand Theming
export const EnergiaBrand: Story = {
  args: {
    brand: 'energia',
    header: 'Energia Card',
    body: 'This card uses Energia brand colors.',
    footer: 'Learn more',
  },
};

export const PowerNIBrand: Story = {
  args: {
    brand: 'powerni',
    header: 'PowerNI Card',
    body: 'This card uses PowerNI brand colors.',
    footer: 'Learn more',
  },
};

// No Border
export const NoBorder: Story = {
  args: {
    bordered: false,
    header: 'Borderless Card',
    body: 'This card has no border for a cleaner look.',
  },
};

// Text Alignment
export const CenterAligned: Story = {
  args: {
    textAlign: 'center',
    header: 'Centered Card',
    body: 'All content in this card is center-aligned.',
    footer: 'Footer text',
  },
};

// Using Children
export const WithChildren: Story = {
  render: () => (
    <Card>
      <h3 style={{ margin: '0 0 1rem 0' }}>Custom Content</h3>
      <p style={{ margin: '0 0 0.5rem 0' }}>
        You can use the children prop for completely custom card content.
      </p>
      <button className="btn btn-primary">Action Button</button>
    </Card>
  ),
};

// Card Grid
export const CardGrid: Story = {
  args: {
    image: 'https://placehold.co/600x400',
  },

  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}
    >
      <Card
        image="https://via.placeholder.com/400x225"
        imageAlt="Product 1"
        header="Product 1"
        body="Description of product 1"
        footer="€19.99"
        href="#"
      />
      <Card
        image="https://via.placeholder.com/400x225"
        imageAlt="Product 2"
        header="Product 2"
        body="Description of product 2"
        footer="€24.99"
        href="#"
      />
      <Card
        image="https://via.placeholder.com/400x225"
        imageAlt="Product 3"
        header="Product 3"
        body="Description of product 3"
        footer="€29.99"
        href="#"
      />
    </div>
  ),

  parameters: {
    layout: 'padded',
  },
};

// Different Styles
export const CardVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Card header="Simple Card" body="Just header and body" />
      <Card
        image="https://via.placeholder.com/300x169"
        imageAlt="With image"
        body="Card with image"
      />
      <Card body="Borderless card" bordered={false} />
      <Card header="Clickable" body="Hover to see effect" href="#" />
    </div>
  ),
};

// Brand Comparison
export const BrandComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      <Card header="Default Theme" body="Uses Bootstrap default colors" footer="Default" />
      <Card
        brand="energia"
        header="Energia Theme"
        body="Uses Energia brand colors"
        footer="Energia"
      />
      <Card
        brand="powerni"
        header="PowerNI Theme"
        body="Uses PowerNI brand colors"
        footer="PowerNI"
      />
    </div>
  ),
};

// Feature Showcase
export const FeatureCards: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
      <Card textAlign="center">
        <div style={{ fontSize: '3rem', margin: '1rem 0' }}>⚡</div>
        <h3>Fast Performance</h3>
        <p>Lightning-fast load times and optimized delivery.</p>
      </Card>
      <Card textAlign="center">
        <div style={{ fontSize: '3rem', margin: '1rem 0' }}>🔒</div>
        <h3>Secure</h3>
        <p>Enterprise-grade security for your peace of mind.</p>
      </Card>
      <Card textAlign="center">
        <div style={{ fontSize: '3rem', margin: '1rem 0' }}>💪</div>
        <h3>Reliable</h3>
        <p>99.9% uptime guarantee with 24/7 support.</p>
      </Card>
    </div>
  ),
};

// Blog Post Cards
export const BlogPosts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Card
        image="https://via.placeholder.com/800x400"
        imageAlt="Blog post 1"
        header="Understanding Renewable Energy"
        body="Learn about the latest developments in renewable energy technology and how it's shaping our future."
        footer="Published: Jan 15, 2025"
        href="#"
      />
      <Card
        image="https://via.placeholder.com/800x400"
        imageAlt="Blog post 2"
        header="Energy Saving Tips for Your Home"
        body="Discover practical tips to reduce your energy consumption and lower your bills."
        footer="Published: Jan 10, 2025"
        href="#"
      />
    </div>
  ),
};

// Pricing Cards
export const PricingCards: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
      <Card textAlign="center">
        <h3>Basic</h3>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>€9.99</div>
        <p>Perfect for individuals</p>
        <ul style={{ textAlign: 'left', margin: '1rem 0' }}>
          <li>1 User</li>
          <li>10 GB Storage</li>
          <li>Email Support</li>
        </ul>
        <button className="btn btn-outline-primary w-100">Choose Plan</button>
      </Card>
      <Card textAlign="center" brand="energia">
        <h3>Pro</h3>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>€19.99</div>
        <p>Great for small teams</p>
        <ul style={{ textAlign: 'left', margin: '1rem 0' }}>
          <li>5 Users</li>
          <li>100 GB Storage</li>
          <li>Priority Support</li>
        </ul>
        <button className="btn btn-primary w-100">Choose Plan</button>
      </Card>
      <Card textAlign="center">
        <h3>Enterprise</h3>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>Custom</div>
        <p>For large organizations</p>
        <ul style={{ textAlign: 'left', margin: '1rem 0' }}>
          <li>Unlimited Users</li>
          <li>Unlimited Storage</li>
          <li>24/7 Support</li>
        </ul>
        <button className="btn btn-outline-primary w-100">Contact Us</button>
      </Card>
    </div>
  ),
};
