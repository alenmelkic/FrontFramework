# FormInput

Text input component with label, validation, and error messaging.

## Import

```tsx
import { FormInput } from '@feframework/ui';
import type { FormInputProps } from '@feframework/ui';
```

## Basic Usage

```tsx
<FormInput
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  required
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Input label text |
| `type` | `FormInputType` | `'text'` | Input type |
| `error` | `string` | `undefined` | Error message |
| `helperText` | `string` | `undefined` | Helper text below input |
| `size` | `FormInputSize` | `'md'` | Input size |
| `brand` | `'energia' \| 'powerni'` | `undefined` | Brand theming |

## Input Types

Supports: `text`, `email`, `password`, `tel`, `url`, `number`, `search`

## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-forminput--default)
