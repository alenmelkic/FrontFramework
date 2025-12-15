/**
 * Static HTML Exporter
 * Renders React components to static HTML for CMS integration
 */

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'fs';
import path from 'path';

// Import all components
import { Button } from '../../packages/ui/src/components/Button/Button';
import { Card } from '../../packages/ui/src/components/Card/Card';
import { Hero } from '../../packages/ui/src/components/Hero/Hero';
import { Alert } from '../../packages/ui/src/components/Alert/Alert';
import { Footer } from '../../packages/ui/src/components/Footer/Footer';
import { Navbar } from '../../packages/ui/src/components/Navbar/Navbar';
import { FormInput } from '../../packages/ui/src/components/FormInput/FormInput';
import { FormSelect } from '../../packages/ui/src/components/FormSelect/FormSelect';

// Sample props for each component
const componentSamples = {
  Button: {
    props: { variant: 'primary' as const, children: 'Click Me' },
    html: 'button-sample.html'
  },
  Card: {
    props: {
      header: 'Card Title',
      body: 'This is the card body content. You can put any HTML content here.',
      footer: 'Card Footer',
    },
    html: 'card-sample.html'
  },
  Hero: {
    props: {
      title: 'Welcome to Our Site',
      subtitle: 'Discover amazing features and services',
      primaryAction: { text: 'Get Started', onClick: () => {} },
      secondaryAction: { text: 'Learn More', onClick: () => {} },
    },
    html: 'hero-sample.html'
  },
  Alert: {
    props: {
      variant: 'success' as const,
      children: 'This is a success alert message!',
      dismissible: true,
    },
    html: 'alert-sample.html'
  },
  Footer: {
    props: {
      copyright: '© 2024 FEFramework. All rights reserved.',
    },
    html: 'footer-sample.html'
  },
  Navbar: {
    props: {
      brand: 'FEFramework',
      links: [
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about' },
        { text: 'Contact', href: '/contact' },
      ],
    },
    html: 'navbar-sample.html'
  },
  FormInput: {
    props: {
      label: 'Email Address',
      type: 'email' as const,
      placeholder: 'Enter your email',
      required: true,
    },
    html: 'forminput-sample.html'
  },
  FormSelect: {
    props: {
      label: 'Select an option',
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ],
    },
    html: 'formselect-sample.html'
  },
};

/**
 * Render a component to static HTML
 */
export function renderComponentToHTML(
  Component: React.ComponentType<any>,
  props: Record<string, any>
): string {
  try {
    const html = renderToStaticMarkup(React.createElement(Component, props));
    return html;
  } catch (error) {
    console.error('Error rendering component:', error);
    return '';
  }
}

/**
 * Export all components as static HTML files
 */
export async function exportStaticHTML(outputDir: string, brand: string = 'energia') {
  console.log(`\n📄 Exporting static HTML files for ${brand} brand...`);
  console.log(`Output directory: ${outputDir}\n`);

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const components = {
    Button,
    Card,
    Hero,
    Alert,
    Footer,
    Navbar,
    FormInput,
    FormSelect,
  };

  let exportedCount = 0;

  for (const [componentName, Component] of Object.entries(components)) {
    const sample = componentSamples[componentName as keyof typeof componentSamples];

    if (!sample) {
      console.warn(`⚠️  No sample props for ${componentName}, skipping`);
      continue;
    }

    // Render component to HTML
    const html = renderComponentToHTML(Component, sample.props);

    if (!html) {
      console.error(`❌ Failed to render ${componentName}`);
      continue;
    }

    // Create component directory
    const componentDir = path.join(outputDir, componentName.toLowerCase());
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    // Write HTML file
    const htmlPath = path.join(componentDir, sample.html);

    // Wrap in a complete HTML document with CSS link
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${componentName} - FEFramework</title>
  <link rel="stylesheet" href="../${componentName.toLowerCase()}.min.css">
</head>
<body class="brand-${brand}">
  ${html}
</body>
</html>`;

    fs.writeFileSync(htmlPath, fullHTML, 'utf-8');
    console.log(`✅ ${componentName}: ${sample.html}`);
    exportedCount++;
  }

  console.log(`\n✨ Exported ${exportedCount} components as static HTML\n`);
}
