import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/overview',
        'components/button',
        'components/form-input',
        'components/form-select',
        'components/alert',
        'components/card',
        'components/hero',
        'components/footer',
        'components/navbar',
        'components/modal',
        'components/carousel',
      ],
    },
    {
      type: 'category',
      label: 'Theming',
      items: [
        'theming/overview',
        'theming/tokens',
        'theming/creating-themes',
      ],
    },
    {
      type: 'category',
      label: 'Kentico Integration',
      items: [
        'kentico-integration/overview',
        'kentico-integration/usage',
        'kentico-integration/manifest',
      ],
    },
    {
      type: 'category',
      label: 'Accessibility',
      items: [
        'accessibility/overview',
        'accessibility/testing',
      ],
    },
  ],
};

export default sidebars;
