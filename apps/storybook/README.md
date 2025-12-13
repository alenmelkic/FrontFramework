# FEFramework Storybook

Storybook documentation and visual testing for the FEFramework component library.

## Features

- **All 10 Components**: Interactive documentation for all core components
- **Brand Switcher**: Toggle between Energia and PowerNI themes in the toolbar
- **Accessibility Testing**: Built-in a11y addon for WCAG 2.1 AA compliance testing
- **Interactive Controls**: Modify component props in real-time
- **Auto-generated Docs**: Component API documentation from TypeScript types

## Running Storybook

From the root directory:

```bash
npm run storybook
```

Or from this directory:

```bash
npm run storybook
```

Storybook will start on [http://localhost:6006](http://localhost:6006)

## Building Storybook

To build a static version of Storybook:

```bash
npm run build
```

The output will be in `storybook-static/` directory.

## Brand Switcher

Use the toolbar dropdown to switch between:
- **Energia** (green theme)
- **PowerNI** (blue theme)

The entire Storybook interface will update to reflect the selected brand's theme.

## Accessibility Testing

The a11y addon is enabled for all stories. Check the "Accessibility" tab in the addons panel to see WCAG violations and best practices.

## Component Stories

All component stories are located in `packages/ui/src/components/*/Component.stories.tsx`.

Each component has multiple story variations demonstrating:
- Default state
- All variants
- Brand theming
- Interactive states
- Edge cases
