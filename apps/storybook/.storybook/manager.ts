import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'FEFramework',
  brandUrl: 'https://github.com/feframework',
  brandTarget: '_self',

  // Colors - Energia green as primary
  colorPrimary: '#00a651',
  colorSecondary: '#005826',

  // UI
  appBg: '#f8f9fa',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#dee2e6',
  appBorderRadius: 4,

  // Text colors
  textColor: '#212529',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#495057',
  barSelectedColor: '#00a651',
  barHoverColor: '#00a651',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#ced4da',
  inputTextColor: '#212529',
  inputBorderRadius: 4,
});

addons.setConfig({
  theme,
});
