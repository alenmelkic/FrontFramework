/**
 * Accessibility Test Utilities
 * Helpers for testing WCAG 2.1 AA compliance
 */

import { axe, toHaveNoViolations } from 'jest-axe';
import { RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations);

/**
 * Run axe accessibility tests on a rendered component
 * @param container - The container element from render result
 * @param options - Additional axe options
 */
export async function runAxeTest(
  container: HTMLElement,
  options?: any
): Promise<void> {
  const results = await axe(container, {
    rules: {
      // Ensure proper color contrast (WCAG AA: 4.5:1)
      'color-contrast': { enabled: true },
      // Ensure proper ARIA usage
      'aria-valid-attr': { enabled: true },
      'aria-valid-attr-value': { enabled: true },
      // Ensure proper heading hierarchy
      'heading-order': { enabled: true },
      // Ensure images have alt text
      'image-alt': { enabled: true },
      // Ensure labels for form inputs
      'label': { enabled: true },
      // Button elements must have text
      'button-name': { enabled: true },
    },
    ...options,
  });

  expect(results).toHaveNoViolations();
}

/**
 * Test keyboard navigation for an element
 * @param element - The element to test
 */
export async function testKeyboardNavigation(element: HTMLElement) {
  const user = userEvent.setup();

  // Tab to element
  await user.tab();
  expect(element).toHaveFocus();

  // Test Enter key
  await user.keyboard('{Enter}');

  // Test Escape key
  await user.keyboard('{Escape}');

  return user;
}

/**
 * Test focus management for modals/dialogs
 * @param renderResult - The render result containing the modal
 */
export async function testFocusTrap(renderResult: RenderResult) {
  const user = userEvent.setup();
  const { container } = renderResult;

  // Get all focusable elements
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) {
    throw new Error('No focusable elements found in modal');
  }

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  // Focus should start on first element
  expect(firstElement).toHaveFocus();

  // Tab through all elements
  for (let i = 0; i < focusableElements.length - 1; i++) {
    await user.tab();
  }

  // Last element should have focus
  expect(lastElement).toHaveFocus();

  // Tab again should cycle back to first
  await user.tab();
  expect(firstElement).toHaveFocus();

  // Shift+Tab from first should go to last
  await user.tab({ shift: true });
  expect(lastElement).toHaveFocus();

  return user;
}

/**
 * Verify ARIA attributes on an element
 * @param element - The element to check
 * @param expectedAttrs - Expected ARIA attributes
 */
export function verifyAriaAttributes(
  element: HTMLElement,
  expectedAttrs: Record<string, string | boolean | null>
) {
  Object.entries(expectedAttrs).forEach(([attr, value]) => {
    if (value === null) {
      expect(element).not.toHaveAttribute(attr);
    } else if (typeof value === 'boolean') {
      expect(element).toHaveAttribute(attr, value.toString());
    } else {
      expect(element).toHaveAttribute(attr, value);
    }
  });
}

/**
 * Calculate color contrast ratio (simplified)
 * For proper contrast checking, use axe instead
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 */
export function getContrastRatio(foreground: string, background: string): number {
  // This is a simplified version - use axe for accurate testing
  // Implementing full WCAG contrast calculation is complex
  // This is just for demonstration purposes

  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = ((rgb >> 0) & 0xff) / 255;

    const [rs, gs, bs] = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Verify minimum contrast ratio meets WCAG AA (4.5:1 for normal text)
 */
export function meetsWCAG_AA(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 4.5;
}

/**
 * Verify minimum contrast ratio meets WCAG AAA (7:1 for normal text)
 */
export function meetsWCAG_AAA(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 7;
}

/**
 * Test screen reader announcements
 * @param container - Container element
 * @param expectedText - Expected announcement text
 */
export function verifyScreenReaderAnnouncement(
  container: HTMLElement,
  expectedText: string
) {
  const liveRegion = container.querySelector('[aria-live]');
  expect(liveRegion).toBeInTheDocument();
  expect(liveRegion).toHaveTextContent(expectedText);
}

/**
 * Verify an element has proper heading hierarchy
 * @param container - Container element
 */
export function verifyHeadingHierarchy(container: HTMLElement) {
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;

  headings.forEach(heading => {
    const level = parseInt(heading.tagName.charAt(1));

    // Heading levels should not skip (e.g., h1 to h3)
    if (previousLevel > 0 && level > previousLevel + 1) {
      throw new Error(
        `Heading hierarchy skips from h${previousLevel} to h${level}`
      );
    }

    previousLevel = level;
  });
}
