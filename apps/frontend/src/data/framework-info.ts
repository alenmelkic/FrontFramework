export interface FrameworkInfo {
  name: string;
  version: string;
  description: string;
  capabilities: string[];
  technologies: Technology[];
  brands: BrandInfo[];
  links: LinkInfo[];
}

export interface Technology {
  name: string;
  version: string;
  purpose: string;
}

export interface BrandInfo {
  id: 'energia' | 'powerni';
  name: string;
  color: string;
  description: string;
}

export interface LinkInfo {
  title: string;
  url: string;
  description: string;
}

export const frameworkInfo: FrameworkInfo = {
  name: 'FEFramework',
  version: '1.0.0',
  description: 'Enterprise multi-brand frontend component library built with React, TypeScript, and Bootstrap. Provides 10 accessible, customizable components with multi-platform export capabilities for Kentico, WordPress, and Strapi CMS platforms.',
  capabilities: [
    'Multi-brand theming (Energia, PowerNI)',
    'WCAG 2.1 AA compliant components',
    'Component export for multiple CMS platforms',
    'Server-side rendering support',
    'Comprehensive accessibility testing',
    'Interactive Storybook documentation',
    'TypeScript type safety',
    'Responsive Bootstrap 5 design',
  ],
  technologies: [
    { name: 'React', version: '19.2.1', purpose: 'Component library and UI framework' },
    { name: 'TypeScript', version: '5.7.3', purpose: 'Type safety and developer experience' },
    { name: 'Bootstrap', version: '5.3.8', purpose: 'CSS framework and design system' },
    { name: 'Vite', version: '7.2.4', purpose: 'Build tool and development server' },
    { name: 'Swiper', version: '12.0.3', purpose: 'Carousel and slider functionality' },
    { name: 'React Router', version: '7.1.3', purpose: 'Client-side routing' },
    { name: 'Storybook', version: '8.6.14', purpose: 'Component documentation and testing' },
    { name: 'Vitest', version: '2.0.0', purpose: 'Unit and integration testing' },
    { name: 'jest-axe', version: '9.0.0', purpose: 'Accessibility testing' },
    { name: 'Sass', version: '1.96.0', purpose: 'SCSS preprocessing' },
  ],
  brands: [
    {
      id: 'energia',
      name: 'Energia',
      color: '#00a651',
      description: 'Energia brand theme with green primary color palette',
    },
    {
      id: 'powerni',
      name: 'PowerNI',
      color: '#0066b3',
      description: 'PowerNI brand theme with blue primary color palette',
    },
  ],
  links: [
    {
      title: 'Storybook',
      url: 'http://localhost:6006',
      description: 'Interactive component documentation and playground',
    },
    {
      title: 'GitHub Repository',
      url: '#',
      description: 'Source code and contribution guidelines',
    },
    {
      title: 'Documentation',
      url: '#',
      description: 'Comprehensive usage documentation',
    },
  ],
};

export const gettingStarted = {
  installation: `pnpm add @feframework/ui bootstrap`,
  npmInstallation: `npm install @feframework/ui bootstrap`,
  usage: `import { Button, Card, Hero } from '@feframework/ui';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Button variant="primary">Click Me</Button>
      <Card header="Card Title" body="Card content goes here" />
    </div>
  );
}`,
};

export const exportFormats = [
  {
    platform: 'Kentico MVC',
    status: 'Active',
    format: 'IIFE JavaScript bundles',
    output: 'dist/kentico/',
    description: 'Auto-mounting components with data-component attributes',
    command: 'pnpm build:kentico:energia',
  },
  {
    platform: 'WordPress',
    status: 'In Development',
    format: 'Gutenberg blocks (HTML/CSS/JS)',
    output: 'dist/wordpress/',
    description: 'Static HTML with vanilla JavaScript for Gutenberg',
    command: 'pnpm build:wordpress:energia',
  },
  {
    platform: 'Strapi V4',
    status: 'Planned',
    format: 'Component schemas (HTML/CSS/JS)',
    output: 'dist/strapi/',
    description: 'Strapi component schemas with static HTML',
    command: 'pnpm build:strapi:energia',
  },
];
