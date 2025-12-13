/**
 * Focus Trap Utility
 * Traps focus within a container (for modals, dialogs)
 */

import { useEffect, RefObject } from 'react';

/**
 * Get all focusable elements within a container
 */
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors));
};

/**
 * Create a focus trap within a container
 * @param container - The container element to trap focus within
 * @returns Cleanup function to remove the focus trap
 */
export const createFocusTrap = (container: HTMLElement): (() => void) => {
  const focusableElements = getFocusableElements(container);
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  // Store the previously focused element
  const previouslyFocused = document.activeElement as HTMLElement;

  // Focus the first focusable element
  if (firstFocusable) {
    firstFocusable.focus();
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    // Get current focusable elements (they might have changed)
    const currentFocusable = getFocusableElements(container);
    const currentFirst = currentFocusable[0];
    const currentLast = currentFocusable[currentFocusable.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === currentFirst) {
        event.preventDefault();
        currentLast?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === currentLast) {
        event.preventDefault();
        currentFirst?.focus();
      }
    }
  };

  // Add event listener
  container.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
    // Restore focus to previously focused element
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
      previouslyFocused.focus();
    }
  };
};

/**
 * Focus trap hook for React components
 */
export const useFocusTrap = (
  isActive: boolean,
  containerRef: RefObject<HTMLElement>
): void => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const cleanup = createFocusTrap(containerRef.current);
    return cleanup;
  }, [isActive, containerRef]);
};
