/**
 * Mock Data for Tests
 * Reusable mock data and fixtures
 */

// Mock component props
export const mockButtonProps = {
  onClick: () => {},
  children: 'Click Me',
  variant: 'primary' as const,
  size: 'md' as const,
  disabled: false,
  loading: false,
};

export const mockCardProps = {
  header: 'Card Header',
  body: 'Card body content',
  footer: 'Card footer',
  image: 'https://via.placeholder.com/300x200',
  imageAlt: 'Placeholder image',
};

export const mockHeroProps = {
  title: 'Hero Title',
  subtitle: 'Hero subtitle text',
  backgroundImage: 'https://via.placeholder.com/1920x600',
  overlayOpacity: 0.5,
};

export const mockCarouselSlides = [
  {
    id: '1',
    image: 'https://via.placeholder.com/800x400',
    alt: 'Slide 1',
    title: 'First Slide',
    description: 'First slide description',
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/800x400',
    alt: 'Slide 2',
    title: 'Second Slide',
    description: 'Second slide description',
  },
  {
    id: '3',
    image: 'https://via.placeholder.com/800x400',
    alt: 'Slide 3',
    title: 'Third Slide',
    description: 'Third slide description',
  },
];

export const mockFormInputProps = {
  id: 'test-input',
  label: 'Test Input',
  name: 'testInput',
  type: 'text' as const,
  value: '',
  onChange: () => {},
};

export const mockFormSelectProps = {
  id: 'test-select',
  label: 'Test Select',
  name: 'testSelect',
  value: '',
  onChange: () => {},
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ],
};

export const mockNavItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export const mockFooterLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
];

// Mock event handlers
export const mockHandlers = {
  onClick: vi.fn(),
  onChange: vi.fn(),
  onSubmit: vi.fn(),
  onClose: vi.fn(),
  onOpen: vi.fn(),
};

// Reset all mock handlers
export function resetMockHandlers() {
  Object.values(mockHandlers).forEach(handler => handler.mockClear());
}
