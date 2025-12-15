import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'FEFramework',
  tagline: 'Enterprise Multi-Brand Component Library',
  favicon: 'img/favicon.ico',

  url: 'https://feframework.dev',
  baseUrl: '/',

  organizationName: 'feframework',
  projectName: 'feframework',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/feframework/feframework/tree/main/apps/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'FEFramework',
      logo: {
        alt: 'FEFramework Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/components/overview',
          label: 'Components',
          position: 'left',
        },
        {
          href: 'http://localhost:6006',
          label: 'Storybook',
          position: 'right',
        },
        {
          href: 'https://github.com/feframework/feframework',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'Components',
              to: '/docs/components/overview',
            },
            {
              label: 'Theming',
              to: '/docs/theming/overview',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Storybook',
              href: 'http://localhost:6006',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/feframework/feframework',
            },
          ],
        },
        {
          title: 'Brands',
          items: [
            {
              label: 'Energia',
              href: 'https://energia.ie',
            },
            {
              label: 'Power NI',
              href: 'https://powerni.co.uk',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FEFramework. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
