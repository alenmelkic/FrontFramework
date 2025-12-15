export interface ComponentData {
  name: string;
  description: string;
  category: string;
  props: string[];
  features: string[];
  a11yFeatures: string[];
}

export const componentsData: ComponentData[] = [
  {
    name: 'Button',
    description: 'Accessible button component with multiple variants, sizes, and loading states',
    category: 'Form Controls',
    props: ['variant', 'size', 'disabled', 'loading', 'onClick', 'type'],
    features: [
      'Multiple variants (primary, secondary, success, danger, etc.)',
      'Three sizes (sm, md, lg)',
      'Loading state with spinner',
      'Disabled state',
      'Full keyboard support',
    ],
    a11yFeatures: [
      'ARIA disabled and busy states',
      'Keyboard navigation support',
      'Color contrast compliance',
      'Focus visible indicators',
    ],
  },
  {
    name: 'Card',
    description: 'Flexible content container with optional header, body, footer, and image',
    category: 'Layout',
    props: ['header', 'body', 'footer', 'image', 'imageAlt', 'href', 'className'],
    features: [
      'Optional header, body, and footer sections',
      'Image support with alt text',
      'Clickable card variant (href)',
      'Responsive design',
    ],
    a11yFeatures: [
      'Semantic HTML (article/anchor)',
      'Required image alt text',
      'Keyboard navigation for clickable cards',
      'Focus indicators',
    ],
  },
  {
    name: 'Hero',
    description: 'Full-width hero section with background image, title, subtitle, and call-to-action buttons',
    category: 'Content',
    props: ['title', 'subtitle', 'backgroundImage', 'overlayOpacity', 'primaryAction', 'secondaryAction'],
    features: [
      'Background image with customizable overlay',
      'Centered content layout',
      'Primary and secondary CTAs',
      'Responsive typography',
    ],
    a11yFeatures: [
      'Proper heading hierarchy',
      'Text contrast on overlay',
      'Accessible CTA buttons',
      'Screen reader optimized',
    ],
  },
  {
    name: 'Carousel',
    description: 'Swiper-based carousel with navigation, pagination, autoplay, and full accessibility',
    category: 'Interactive',
    props: ['slides', 'autoplay', 'navigation', 'pagination', 'ariaLabel'],
    features: [
      'Powered by Swiper 12',
      'Navigation arrows',
      'Pagination dots',
      'Autoplay with pause/play',
      'Touch/swipe support',
    ],
    a11yFeatures: [
      'ARIA labels on navigation',
      'Keyboard navigation (arrow keys)',
      'Screen reader announcements',
      'Pause/play controls for autoplay',
      'Focus management',
    ],
  },
  {
    name: 'FormInput',
    description: 'Text input field with label, error message, and validation support',
    category: 'Form Controls',
    props: ['label', 'type', 'value', 'onChange', 'error', 'required', 'disabled'],
    features: [
      'Multiple input types (text, email, password, number, etc.)',
      'Label and error message',
      'Validation states',
      'Required field indicator',
    ],
    a11yFeatures: [
      'Associated label with htmlFor',
      'ARIA invalid and describedby',
      'Error message announcements',
      'Required field indication',
    ],
  },
  {
    name: 'FormSelect',
    description: 'Dropdown select component with label, options, and error handling',
    category: 'Form Controls',
    props: ['label', 'options', 'value', 'onChange', 'error', 'required', 'disabled'],
    features: [
      'Customizable option list',
      'Label and error message',
      'Validation states',
      'Disabled state',
    ],
    a11yFeatures: [
      'Associated label',
      'ARIA invalid for errors',
      'Keyboard navigation',
      'Screen reader support',
    ],
  },
  {
    name: 'Modal',
    description: 'Accessible dialog modal with focus trap, backdrop, and keyboard controls',
    category: 'Interactive',
    props: ['isOpen', 'onClose', 'title', 'children', 'size', 'closeOnBackdropClick'],
    features: [
      'Portal rendering',
      'Focus trap when open',
      'Backdrop click to close',
      'ESC key to close',
      'Body scroll lock',
      'Multiple sizes',
    ],
    a11yFeatures: [
      'Focus trap implementation',
      'ARIA dialog role',
      'ARIA labelledby for title',
      'Keyboard controls (ESC to close)',
      'Focus restoration on close',
    ],
  },
  {
    name: 'Navbar',
    description: 'Responsive navigation header with mobile toggle and dropdown support',
    category: 'Navigation',
    props: ['brand', 'links', 'actions', 'sticky'],
    features: [
      'Brand logo/text',
      'Navigation links',
      'Mobile hamburger menu',
      'Dropdown support',
      'Sticky positioning option',
    ],
    a11yFeatures: [
      'Semantic nav element',
      'ARIA expanded for mobile toggle',
      'Keyboard navigation',
      'Focus management',
    ],
  },
  {
    name: 'Footer',
    description: 'Footer component with links, copyright, and multi-column layout',
    category: 'Layout',
    props: ['columns', 'copyright', 'socialLinks'],
    features: [
      'Multi-column layout',
      'Link groups',
      'Copyright text',
      'Social media links',
    ],
    a11yFeatures: [
      'Semantic footer element',
      'Accessible link text',
      'Keyboard navigation',
      'Proper heading hierarchy',
    ],
  },
  {
    name: 'Alert',
    description: 'Notification alert with variants, dismissible option, and icons',
    category: 'Feedback',
    props: ['variant', 'children', 'dismissible', 'onClose', 'icon'],
    features: [
      'Multiple variants (success, warning, danger, info)',
      'Dismissible with close button',
      'Optional icon',
      'Auto-dismiss option',
    ],
    a11yFeatures: [
      'ARIA role="alert" for live regions',
      'Screen reader announcements',
      'Keyboard accessible dismiss button',
      'Color + icon for accessibility',
    ],
  },
];
